import SiginInForm from "../components/SiginInForm";
import GoBackButton from "../components/GoBackButton";
import { motion } from "framer-motion";

export default function Signin() {
  return (
    <motion.div
      transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
        <GoBackButton />
        <div className="p-6 border shadow-lg rounded-2xl w-96">
          <h2 className="mb-4 text-2xl font-bold text-center text-slate-200">
            Sign In
          </h2>
          <SiginInForm />
        </div>
      </div>
    </motion.div>
  );
}
