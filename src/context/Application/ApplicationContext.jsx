import { createContext, useReducer } from "react";
import ApplicationReducer from "./ApplicationReducer";
import axios from "axios";
export const ApplicationContext = createContext();
import { useEffect } from "react";

export const ApplicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ApplicationReducer, {
    // each application will have a id: Integer, job_id: Integer, user_id: Integer, status: String, resume: String, cover_letter: String, date: Date
    applications: [],
    application: null,
    current: null,
    myApplications: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    getApplications();
  }, []);

  // backend api takes in a token for authentication and returns a list of applications
  const getApplications = async () => {
    try {
      const res = await axios.get("/api/applications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "GET_APPLICATIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // get my Applications
  const getMyApplications = async (id) => {
    try {
      const res = await axios.get(`/api/applications/my/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "GET_MY_APPLICATIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getApplication = async (id) => {
    try {
      const res = await axios.get(`/api/applications/${id}`);
      dispatch({
        type: "GET_APPLICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addApplication = async (application) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.post("/api/applications", application, config);
      dispatch({
        type: "ADD_APPLICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const updateApplication = async (application) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.put(
        `/api/applications/${application._id}`,
        application,
        config
      );
      dispatch({
        type: "UPDATE_APPLICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "DELETE_APPLICATION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications: state.applications,
        application: state.application,
        current: state.current,
        myApplications: state.myApplications,
        loading: state.loading,
        error: state.error,
        getApplications,
        getMyApplications,
        getApplication,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
