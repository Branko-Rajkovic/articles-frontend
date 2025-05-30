import Loader from "./Loader";
import Error from "../pages/Error";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useFetchData from "../hooks/useFetchData";

export default function UsersList() {
  const { auth } = useAuth();
  const { data, loading, error } = useFetchData(
    "http://127.0.0.1:3000/api/v1/users/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  );

  if (loading) return <Loader />;
  if (error) return <Error />;

  async function handleDelete(id) {
    console.log(id);
    try {
      const result = await axios.delete(
        `http://127.0.0.1:3000/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("delete request ended ...");
    }
  }

  return (
    <main className="min-h-screen m-4">
      <div>
        {!loading && (
          <ul>
            {data.data.docs.map((user) => {
              const id = user._id;
              const name = user.name;
              const email = user.email;
              const photo = user.photo;
              const role = user.role;
              const signedAt = user.createdAt;

              return (
                <li
                  key={id}
                  className="p-2 border-4 bg-slate-500 text-slate-200 border-slate-200"
                >
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p>{email}</p>
                  <img
                    src={`http://127.0.0.1:3000/images/users/${photo}`}
                    alt="user-photo"
                    className="w-12 m-2 border-2 rounded-full"
                  />
                  <p>role: {role}</p>
                  <p>Signed up at: {signedAt}</p>
                  <div className="flex justify-between">
                    {auth.role === "admin" && (
                      <div>
                        <button className="px-2 py-1 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900">
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
