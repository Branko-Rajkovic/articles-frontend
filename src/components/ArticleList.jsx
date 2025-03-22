import { NavLink } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loader from "./Loader";
import Error from "../pages/Error";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function ArticleList() {
  const { auth } = useAuth();
  const { data, loading, error } = useFetchData(
    "http://127.0.0.1:3000/api/v1/articles/"
  );

  if (loading) return <Loader />;
  if (error) return <Error />;

  async function handleDelete(id) {
    try {
      const result = await axios.delete(
        `http://127.0.0.1:3000/api/v1/articles/${id}`,
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
            {data.data.docs.map((article) => {
              const id = article.id;
              const title = article.title;
              const summary = article?.summary;

              return (
                <li
                  key={id}
                  className="p-2 border-4 bg-slate-500 text-slate-200 border-slate-200"
                >
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p>{summary}</p>
                  <div className="flex justify-between">
                    <NavLink
                      className="px-2 py-1 rounded-sm bg-emerald-300 hover:bg-emerald-500 text-emerald-900"
                      to={`/articles/${id}`}
                    >
                      Read more ...
                    </NavLink>

                    {auth.role === "admin" && (
                      <div>
                        <button className="px-2 py-1 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900">
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                          onClick={() => handleDelete(article.id)}
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
