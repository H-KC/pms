import { createContext, useReducer } from "react";
import ProjectReducer from "./ProjectReducer";

import axios from "axios";
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, {
    projects: [
      {
        _id: "1",
        title: "AI Research Project",
        description:
          "Exploring advanced AI algorithms for autonomous vehicles.",
        keywords: ["AI", "autonomous vehicles", "machine learning"],
        start_date: "2024-01-15",
        duration: "12 months",
        budget: 1000000.0,
        initial_amount: 250000.0,
        steps: ["Research", "Development", "Testing", "Deployment"],
        payment_systems: ["PayPal", "Stripe"],
        partner_code: ["PART001", "PART002"],
        client_code: "CLI001",
      },
      {
        _id: "2",
        title: "E-commerce Platform Development",
        description:
          "Building a scalable e-commerce platform for small businesses.",
        keywords: ["e-commerce", "web development", "small business"],
        start_date: "2023-09-01",
        duration: "18 months",
        budget: 750000.0,
        initial_amount: 150000.0,
        steps: ["Planning", "Design", "Development", "Launch"],
        payment_systems: ["Square", "PayPal"],
        partner_code: ["PART003"],
        client_code: "CLI002",
      },
      {
        _id: "3",
        title: "Healthcare Management System",
        description:
          "Developing an integrated healthcare management system for hospitals.",
        keywords: ["healthcare", "management system", "hospitals"],
        start_date: "2024-05-01",
        duration: "24 months",
        budget: 1500000.0,
        initial_amount: 300000.0,
        steps: [
          "Requirement Analysis",
          "Design",
          "Development",
          "Implementation",
        ],
        payment_systems: ["Stripe", "Authorize.Net"],
        partner_code: ["PART004", "PART005"],
        client_code: "CLI003",
      },
      {
        _id: "4",
        title: "Blockchain Voting System",
        description:
          "Creating a secure and transparent blockchain-based voting system.",
        keywords: ["blockchain", "voting", "security"],
        start_date: "2023-12-01",
        duration: "14 months",
        budget: 500000.0,
        initial_amount: 100000.0,
        steps: ["Research", "Development", "Testing", "Deployment"],
        payment_systems: ["Coinbase", "Stripe"],
        partner_code: ["PART006"],
        client_code: "CLI004",
      },
      {
        _id: "5",
        title: "Mobile Banking App",
        description:
          "Developing a mobile banking application for improved user experience.",
        keywords: ["mobile banking", "app development", "fintech"],
        start_date: "2024-03-15",
        duration: "10 months",
        budget: 600000.0,
        initial_amount: 120000.0,
        steps: ["Planning", "Development", "Testing", "Launch"],
        payment_systems: ["PayPal", "Square"],
        partner_code: ["PART007"],
        client_code: "CLI005",
      },
    ],
    project: {},
    loading: true,
    error: null,
  });

  // const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      dispatch({
        type: "GET_PROJECTS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "PROJECT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getProject = async (id) => {
    try {
      const res = await axios.get(`/api/projects/${id}`);
      dispatch({
        type: "GET_PROJECT",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "PROJECT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addProject = async (project) => {
    try {
      const res = await axios.post("/api/projects", project);
      dispatch({
        type: "ADD_PROJECT",
        payload: res.data,
      });
      // navigate("/projects");
    } catch (error) {
      dispatch({
        type: "PROJECT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      dispatch({
        type: "DELETE_PROJECT",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "PROJECT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        loading: state.loading,
        error: state.error,
        getProjects,
        getProject,
        addProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
