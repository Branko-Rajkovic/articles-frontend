import { NavLink } from "react-router-dom";
import Login from "./Login";
import useAuth from "../hooks/useAuth";

function Header() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <header>
      <div className="m-2">
        <span className="link-anime">
          <NavLink to="/">Home</NavLink>
        </span>
        <span className="link-anime">
          <NavLink to="/about">About</NavLink>
        </span>

        <span className="link-anime">
          <NavLink to="/contact">Contact</NavLink>
        </span>
        {auth.role === "admin" && (
          <span className="link-anime">
            <NavLink to="/new-article">Add Article</NavLink>
          </span>
        )}
      </div>
      <div className="flex items-center justify-between bg-slate-500">
        <img src="/images/app/globe.png" alt="globe" className="h-48" />
        <h1 className="m-4 text-6xl font-bold text-orange-300">Articles</h1>
        <img
          src="/images/app/globe.png"
          alt="globe"
          className="h-48 scale-x-[-1]"
        />
        <Login />
      </div>
    </header>
  );
}

export default Header;
