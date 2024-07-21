const ApplicationReducer = (state, action) => {
  switch (action.type) {
    case "GET_APPLICATIONS":
      return {
        ...state,
        applications: action.payload,
        loading: false,
      };
    case "GET_APPLICATION":
      return {
        ...state,
        application: action.payload,
        loading: false,
      };
    case "GET_MY_APPLICATIONS":
      return {
        ...state,
        myApplications: action.payload,
        loading: false,
      };
    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [action.payload, ...state.applications],
        loading: false,
        current: null,
      };
    case "DELETE_APPLICATION":
      return {
        ...state,
        applications: state.applications.filter(
          (application) => application._id !== action.payload.id
        ),
        loading: false,
      };
    case "UPDATE_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((application) =>
          application.id === action.payload.id ? action.payload : application
        ),
        loading: false,
        current: null,
      };
    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      };
    case "APPLICATION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ApplicationReducer;
