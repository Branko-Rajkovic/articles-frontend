import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageNotFound() {
  return (
    <motion.div
      transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center h-screen bg-slate-500">
        <img
          src="/images/page404.png"
          alt="page-404-image"
          className="m-8 border-2 rounded-full w-96"
        />
        <p className="m-8 text-4xl text-slate-100">
          <span>🚩</span> Page not found! 404 <span>🚩</span>
        </p>
        <div className="bg-slate-800 text-slate-200">
          {/* <NavLink to="">Go to Home</NavLink> */}
        </div>
        <div className="px-4 py-1 rounded-md bg-slate-600 text-slate-200 hover:bg-slate-200 hover:text-slate-600">
          <NavLink to="/">Go to Homepage</NavLink>
        </div>
      </div>
    </motion.div>
  );
}
