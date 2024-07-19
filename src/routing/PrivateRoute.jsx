import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loadUser, user } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  return !localStorage.token ? <Navigate to="/visit" /> : <Outlet />;
};

export default PrivateRoute;
