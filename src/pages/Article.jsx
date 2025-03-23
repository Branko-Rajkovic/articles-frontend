import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import Error from "./Error";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Content() {
  const params = useParams();

  const { data, loading, error } = useFetchData(
    `http://127.0.0.1:3000/api/v1/articles/${params.articleId}`
  );

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
                    <h2 key={index} className="my-2 text-xl font-semibold">
                      {data.data.doc.subtitles[element.index]}
                    </h2>
                  );
                if (element.type === "paragraph")
                  return (
                    <p key={index}>{data.data.doc.paragraphs[element.index]}</p>
                  );
                if (element.type === "codeSnippet")
                  return (
                    <pre
                      className="px-4 mx-8 bg-slate-800 text-slate-200"
                      key={index}
                    >
                      {data.data.doc.codeSnippets[element.index]}
                    </pre>
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
