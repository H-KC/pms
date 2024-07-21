const AuthReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        current: null,
      };

    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      };
    case "LOGIN_SUCCESS":
      console.log(action);
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
