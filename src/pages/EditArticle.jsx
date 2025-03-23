import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import Error from "./Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useState } from "react";

export default function EditArticle() {
  const [updates, setUpdates] = useState({
    title: "",
    summary: "",
    subtitles: [],
    paragraphs: [],
    codeSnippets: [],
    images: [],
    layoutOrder: [],
  });
  const [change, setChange] = useState(true);
  const { auth } = useAuth();
  const params = useParams();

  const { data, loading, error } = useFetchData(
    `http://127.0.0.1:3000/api/v1/articles/${params.articleId}`
  );

  async function saveChanges(id) {
    const uploadImages = await axios.patch(
      `http://127.0.0.1:3000/api/v1/articles/${id}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    console.log(uploadImages);
  }

  function handleEdit() {
    setChange(false);
  }

  function handleDelete(field, index) {
    if (field === "subtitle") {
      data.data.doc.subtitles[index] = "";

      setUpdates(() => {
        return { ...data.data.doc };
      });
    }
  }

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <main className="page-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
      >
        <Header />

        <button
          className="px-2 py-1 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
          onClick={() => saveChanges(params.articleId)}
        >
          Save Changes
        </button>
        <button
          className="px-2 py-1 mx-2 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900"
          onClick={() => handleEdit()}
        >
          Enable Editing
        </button>
        {!loading && (
          <div className="flex flex-col items-center mx-4">
            <h2 className="m-2 text-4xl font-bold text-slate-500">
              {data.data.doc.title}
            </h2>
            <p className="italic font-semibold">{data.data.doc.summary}</p>

            <div>
              {data.data.doc.layoutOrder.map((element, index) => {
                if (element.type === "image")
                  return (
                    <img
                      key={index}
                      src={`http://127.0.0.1:3000/images/articles/${
                        data.data.doc.images[element.index]
                      }`}
                    />
                  );
                if (element.type === "subtitle")
                  return (
                    <div key={index} className="m-2 border">
                      <input
                        type="text"
                        value={data.data.doc.subtitles[element.index]}
                        disabled={change}
                      />
                      <h2 className="my-2 text-xl font-semibold">
                        {data.data.doc.subtitles[element.index]}
                      </h2>
                      <div className="flex">
                        <button
                          className="px-2 py-1 mx-2 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900"
                          onClick={() => handleEdit()}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                          onClick={() =>
                            handleDelete("subtitle", element.index)
                          }
                        >
                          Delete
                        </button>
                        <button className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500">
                          Add
                        </button>
                      </div>
                    </div>
                  );
                if (element.type === "paragraph")
                  return (
                    <p key={index}>{data.data.doc.paragraphs[element.index]}</p>
                  );
                if (element.type === "codeSnippet")
                  return (
                    <p
                      className="px-4 mx-8 bg-slate-800 text-slate-200"
                      key={index}
                    >
                      {data.data.doc.codeSnippets[element.index]}
                    </p>
                  );
              })}
            </div>
          </div>
        )}
      </motion.div>
      <Footer />
    </main>
  );
}
