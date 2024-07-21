const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case "GET_PROJECT":
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        loading: false,
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        loading: false,
      };
    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
        loading: false,
        current: null,
      };
    case "PROJECT_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default ProjectReducer;
