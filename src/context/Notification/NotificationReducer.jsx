const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case "GET_MY_NOTIFICATIONS":
      return {
        ...state,
        myNotifications: action.payload,
        loading: false,
      };
    case "GET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
        loading: false,
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        loading: false,
        current: null,
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        ),
        loading: false,
      };
    case "UPDATE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.id ? action.payload : notification
        ),
        loading: false,
        current: null,
      };
    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      };
    case "NOTIFICATION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default NotificationReducer;
