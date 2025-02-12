import { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
  article: {},
  status: false,
};

function reducer(state, action) {
  console.log("action", action.payload);
  switch (action.type) {
    case "dataFetched":
      return {
        ...state,
        article: { ...action.payload },
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action unknown");
  }
}

export default function Content() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { article, status } = state;
  const params = useParams();

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/articles/${params.articleId}`
        );

        console.log("resp", response.data.data.doc);
        const resData = response.data.data.doc;
        //console.log("response data", resData);

        dispatch({
          type: "dataFetched",
          payload: resData,
        });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
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
        {status === "ready" && (
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
        )}
      </motion.div>
    </main>
  );
}
