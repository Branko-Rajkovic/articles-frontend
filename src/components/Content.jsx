import { useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { NavLink } from "react-router-dom";

// const initialState = {
//   article: {},
//   status: false,
// };

// function reducer(state, action) {
//   console.log("action", action.payload);
//   switch (action.type) {
//     case "dataFetched":
//       return {
//         ...state,
//         article: { ...action.payload },
//         status: "ready",
//       };
//     case "dataFailed":
//       return { ...state, status: "error" };
//     default:
//       throw new Error("Action unknown");
//   }
// }

export default function Content() {
  const [articles, setArticles] = useState([]);
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { article, status } = state;

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/articles"
        );
        // const jsonRes = await response.json();
        // console.log(jsonRes);
        console.log("resp", response.data.data.docs);
        const resData = response.data.data.docs;
        console.log("response data", resData);

        setArticles((articles) => resData);
      } catch (err) {
        console.log(err);
        // dispatch({ type: "dataFailed" });
      } finally {
        console.log("end of fetch");
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen m-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* {status === "ready" && (
          <>
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <p>{article.summary}</p>
            <h3>{article.contentTopics[0]}</h3>
            <p>{article.paragraphs[0]}</p>
            <ul>
              {article.lists[0].split(" ").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>{article.contentTopics[1]}</h3>
            <p>{article.paragraphs[1]}</p>
          </>
        )} */}
        {articles.length && (
          <ul>
            {articles.map((article) => {
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
                  <NavLink to={`/${id}`}>Read more ...</NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </main>
  );
}
