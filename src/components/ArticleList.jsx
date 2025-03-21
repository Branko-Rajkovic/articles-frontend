import { NavLink } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loader from "./Loader";
import Error from "../pages/Error";

export default function ArticleList() {
  const { data, loading, error } = useFetchData(
    "http://127.0.0.1:3000/api/v1/articles/"
  );

  if (loading) return <Loader />;
  if (error) return <Error />;

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
                  <NavLink to={`/articles/${id}`}>Read more ...</NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
