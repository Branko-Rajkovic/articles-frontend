import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Login from "../components/Login";

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
          <Login />
          <Content />
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
