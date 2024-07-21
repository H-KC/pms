import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    users: [],
    isAuth: false,
    current: null,
    isLoading: true,
  });
  // base url for the backend
  axios.defaults.baseURL = "http://localhost:5000/";

  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);
  // Load user
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({
          type: "USER_LOADED",
          payload: res.data,
        });
        // redirect to home page
      } else {
        navigate("/visit");
      }
    } catch (err) {
      dispatch({ type: "AUTH_ERROR" });
    }
  };
  // get all users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
      console.log(users);
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
      });
    }
  };

  const loginUser = async (user) => {
    // the backend is expecting an object with email and password x-www-form-urlencoded
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      // Convert user object to URL-encoded string
      const userDetails = new URLSearchParams(user).toString();
      console.log(userDetails);
      // Updated to include the full server URL
      const res = await axios.post("/api/users/login", userDetails, config);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      loadUser();
      navigate("/");
    } catch (err) {
      // Error handling
    }
  };

  // register a new user
  const registerUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const userDetails = new URLSearchParams(user).toString();
      const res = await axios.post("/api/users", userDetails, config);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      loadUser();
      navigate("/");
    } catch (err) {
      // Error handling
    }
  };
  const updateUser = async (user) => {
    try {
      const res = await axios.put(`/api/users/${user._id}`, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "UPDATE_USER",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
      });
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch({
        type: "DELETE_USER",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
      });
    }
  };

  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isAuth: state.isAuth,
        current: state.current,
        isLoading: state.isLoading,
        loginUser,
        updateUser,
        deleteUser,
        getUsers,
        logout,
        loadUser,
        registerUser,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
