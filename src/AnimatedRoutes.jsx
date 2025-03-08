import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Article from "./pages/Article";
import AddNewArticle from "./pages/AddNewArticle";
import RequireAuth from "./components/RequireAuth";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles/:articleId" element={<Article />} />

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/new-article" element={<AddNewArticle />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
