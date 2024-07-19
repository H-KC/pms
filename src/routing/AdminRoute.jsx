import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuth, user } = authContext;
  return !localStorage.token && isAuth && user.role === "admin" ? (
    <Navigate to="/visit" />
  ) : (
    <Outlet />
  );
};

export default AdminRoute;
