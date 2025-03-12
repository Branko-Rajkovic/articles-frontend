import { motion } from "framer-motion";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

export default function MyAccount() {
  const { auth } = useAuth();

  return (
    <motion.div
      transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <div className="flex flex-col items-center h-screen bg-slate-600">
        <img
          src="http://127.0.0.1:3000/images/users/user-default-avatar.png"
          alt="page-404-image"
          className="w-48 m-8 border-2 rounded-full"
        />
        <h2 className="m-8 text-4xl text-slate-100">
          <span>📔</span> Account <span>📔</span>
        </h2>
        <div className="font-semibold text-slate-200">
          <p>{auth.name}</p>
          <p>{auth.email}</p>
        </div>
      </div>
    </motion.div>
  );
}
