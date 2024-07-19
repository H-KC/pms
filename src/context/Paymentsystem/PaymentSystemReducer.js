const PaymentSystemReducer = (state, action) => {
  switch (action.type) {
    case "GET_PAYMENTS":
      return {
        ...state,
        payments: action.payload,
        loading: false,
      };
    case "GET_PAYMENT":
      return {
        ...state,
        payment: action.payload,
        loading: false,
      };
    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [action.payload, ...state.payments],
        loading: false,
      };
    case "DELETE_PAYMENT":
      return {
        ...state,
        payments: state.payments.filter(
          (payment) => payment._id !== action.payload
        ),
        loading: false,
      };
    case "PAYMENT_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default PaymentSystemReducer;
