import { NavLink } from "react-router-dom";
import Login from "./Login";
import useAuth from "../hooks/useAuth";

function Header() {
  const { auth } = useAuth();
  console.log("auth", auth);
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
        {auth.name ? (
          <div>
            <img
              src={`http://127.0.0.1:3000/images/users/${auth.photo}`}
              alt="page-404-image"
              className="w-12 m-8 border-2 rounded-full"
            />
            <h2 className="m-4 font-semibold text-slate-200">Hi {auth.name}</h2>
            <NavLink to="/my-account">My Account</NavLink>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
}

export default Header;
