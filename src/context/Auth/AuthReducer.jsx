const AuthReducer = (state, action) => {
  switch (action.type) {
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
