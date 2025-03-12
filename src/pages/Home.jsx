import ArticleList from "../components/ArticleList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="page-bg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header />
          <ArticleList />
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
