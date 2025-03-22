import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { setAuth } = useAuth();

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const token = response?.data?.token;
      console.log(token);
      const role = response?.data?.data?.user?.role;
      const photo = response?.data?.data?.user?.photo;
      const name = response?.data?.data?.user?.name;
      console.log("email", email);
      console.log("password", password);
      console.log("role", role);
      setAuth(() => {
        return {
          email,
          password,
          role,
          token,
          photo,
          name,
        };
      });
      setEmail("");
      setPassword("");

      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-2 m-2 rounded-sm"
      >
        <label htmlFor="email" className="text-slate-300">
          email:
        </label>
        <input
          className="px-2 rounded-sm bg-slate-300"
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password" className="text-slate-300">
          Password:
        </label>
        <input
          className="px-2 rounded-sm bg-slate-300"
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="submit"
          className="px-2 py-1 mx-2 my-1 rounded-sm w-fit text-slate-200 bg-slate-800 hover:bg-emerald-200 hover:text-slate-600"
        >
          Log In
        </button>
      </form>
      <p className="m-2 text-slate-300">
        Need an Account?
        <span className="px-4 py-1 m-2 my-1 rounded-sm text-slate-200 bg-slate-600 hover:bg-emerald-200 hover:text-slate-600">
          <Link to="/signin">Sign In</Link>
        </span>
      </p>
    </section>
  );
}
