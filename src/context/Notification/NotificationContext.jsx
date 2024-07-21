import { createContext, useReducer } from "react";
import NotificationReducer from "./NotificationReducer";
import axios from "axios";
export const NotificationContext = createContext();
import { useEffect } from "react";

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, {
    notifications: [],
    notification: null,
    current: null,
    myNotifications: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "GET_NOTIFICATIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "NOTIFICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getMyNotifications = async (id) => {
    try {
      const res = await axios.get(`/api/notifications/my/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "GET_MY_NOTIFICATIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "NOTIFICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getNotification = async (id) => {
    try {
      const res = await axios.get(`/api/notifications/${id}`);
      dispatch({
        type: "GET_NOTIFICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "NOTIFICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addNotification = async (notification) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.post("/api/notifications", notification, config);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "NOTIFICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "DELETE_NOTIFICATION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "NOTIFICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const updateNotification = async (notification) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.put(
        `/api/notifications/${notification._id}`,
        notification,
        config
      );
      dispatch({
        type: "UPDATE_NOTIFICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "NOTIFICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const setCurrent = (notification) => {
    dispatch({ type: "SET_CURRENT", payload: notification });
  };

  const clearCurrent = () => {
    dispatch({ type: "CLEAR_CURRENT" });
  };

  const clearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        notification: state.notification,
        current: state.current,
        myNotifications: state.myNotifications,
        loading: state.loading,
        error: state.error,
        getNotifications,
        getMyNotifications,
        getNotification,
        addNotification,
        deleteNotification,
        updateNotification,
        setCurrent,
        clearCurrent,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
