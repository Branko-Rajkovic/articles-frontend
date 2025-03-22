import { NavLink } from "react-router-dom";
import Login from "./Login";
import useAuth from "../hooks/useAuth";

function Header() {
  const { auth } = useAuth();
  console.log("auth", auth);
  return (
    <header>
      <div className="flex justify-center p-2 bg-slate-700">
        <div>
          <span className="link-anime">
            <NavLink to="/">Home</NavLink>
          </span>
          <span className="link-anime">
            <NavLink to="/about">About</NavLink>
          </span>

          <span className="link-anime">
            <NavLink to="/contact">Contact</NavLink>
          </span>
        </div>

        {auth.role === "admin" && (
          <div>
            <span className="link-anime">
              <NavLink to="/new-article">Add Article</NavLink>
            </span>
            <span className="link-anime">
              <NavLink to="/manage-users">Manage Users</NavLink>
            </span>
          </div>
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
          <div className="flex flex-col items-center justify-center">
            <NavLink to="/my-account">
              <img
                src={`http://127.0.0.1:3000/images/users/${auth.photo}`}
                alt="user-photo"
                className="w-12 m-2 border-2 rounded-full"
              />
            </NavLink>
            <h2 className="mx-2 font-semibold text-slate-200">{auth.name}</h2>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
}

export default Header;
