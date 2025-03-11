import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function ConfirmEmail() {
  return (
    <motion.div
      transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center h-screen bg-slate-500">
        <img
          src="/images/mailbox.png"
          alt="email-symbol"
          className="m-8 border-2 rounded-full w-96"
        />
        <p className="m-8 text-4xl text-slate-100">
          <span>📬</span> Please check Your email inbox and confirm Your email.{" "}
          <span>📬</span>
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
