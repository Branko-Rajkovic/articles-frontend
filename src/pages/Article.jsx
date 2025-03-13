import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import Error from "./Error";
import Header from "../components/Header";

export default function Content() {
  const params = useParams();

  const { data, loading, error } = useFetchData(
    `http://127.0.0.1:3000/api/v1/articles/${params.articleId}`
  );

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <main className="min-h-screen m-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header />
        {!loading && (
          <>
            <h2 className="m-2 text-2xl font-bold">{data.data.doc.title}</h2>
            <p className="italic font-semibold">{data.data.doc.summary}</p>
            <h3>{data.data.doc.subtitles[0]}</h3>
            <p>{data.data.doc.paragraphs[0]}</p>
            <ul>
              {data.data.doc.lists[0].split(" ").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>{data.data.doc.subtitles[1]}</h3>
            <p>{data.data.doc.paragraphs[1]}</p>
          </>
        )}
      </motion.div>
    </main>
  );
}
