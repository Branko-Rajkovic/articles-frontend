import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ userRole }) {
  const { auth } = useAuth();
  const location = useLocation();

  const allowedRoles = ["user", "admin"];

  console.log(auth);

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : auth?.role ? (
    <Navigate to="/error" state={{ from: location }} replace />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}
