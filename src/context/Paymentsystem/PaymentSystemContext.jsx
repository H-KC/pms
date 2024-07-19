import { createContext, useReducer } from "react";
import  PaymentSystemReducer  from "./PaymentSystemReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PaymentSystemContext = createContext();

export const PaymentSystemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentSystemReducer, {
    payments: [],
    payment: {},
    loading: true,
    error: null,
  });

  // const navigate = useNavigate();

  const getPayments = async () => {
    try {
      const res = await axios.get("/api/payments");
      dispatch({
        type: "GET_PAYMENTS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getPayment = async (id) => {
    try {
      const res = await axios.get(`/api/payments/${id}`);
      dispatch({
        type: "GET_PAYMENT",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addPayment = async (payment) => {
    try {
      const res = await axios.post("/api/payments", payment);
      dispatch({
        type: "ADD_PAYMENT",
        payload: res.data,
      });
      // navigate("/payments");
    } catch (error) {
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`/api/payments/${id}`);
      dispatch({
        type: "DELETE_PAYMENT",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  return (
    <PaymentSystemContext.Provider
      value={{
        payments: state.payments,
        payment: state.payment,
        loading: state.loading,
        error: state.error,
        getPayments,
        getPayment,
        addPayment,
        deletePayment,
      }}
    >
      {children}
    </PaymentSystemContext.Provider>
  );
};
