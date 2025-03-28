import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Article from "./pages/Article";
import AddNewArticle from "./pages/AddNewArticle";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Signin from "./pages/Signin";
import ConfirmEmail from "./pages/ConfirmEmail";
import MyAccount from "./pages/MyAccount";
import Test from "./pages/test";
import ManageUsers from "./pages/ManageUsers";
import EditArticle from "./pages/EditArticle";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/test" element={<Test />} />

          <Route element={<RequireAuth userRole={"user"} />}>
            <Route path="/my-account" element={<MyAccount />} />
          </Route>

          <Route element={<RequireAuth userRole={"admin"} />}>
            <Route path="/new-article" element={<AddNewArticle />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/edit-article/:articleId" element={<EditArticle />} />
          </Route>

          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
