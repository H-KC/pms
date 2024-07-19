import { createContext, useReducer } from "react";
import AiReducer from "./AiReducer";
import axios from "axios";
export const AiContext = createContext();

export const AiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AiReducer, {
    nlpRes: null,
    odRes: null,
  });

  const nlpModel = async (data) => {


    const API_URL =
      "https://api-inference.huggingface.co/models/impira/layoutlm-document-qa";
    const headers = {
      Authorization: "Bearer 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",
    };
    // use try catch to handle errors
    try {
      const response = await axios.post(
        API_URL,
        {
          inputs: data,
        },
        {
          headers: headers,
        }
      );
      console.log(response.data);
      dispatch({
        type: "NLP_MODEL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const objectDetection = async () => {
    // object detection logic here
  };

  return (
    <AiContext.Provider
      value={{
        nlpModel,
        objectDetection,
        nlpRes: state.nlpRes,
        odRes: state.odRes,
      }}
    >
      {children}
    </AiContext.Provider>
  );
};
