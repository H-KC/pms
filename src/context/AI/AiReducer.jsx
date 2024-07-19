const AiReducer = (state, action) => {
  switch (action.type) {
    case "NLP_MODEL":
      return {
        ...state,
        nlpRes: action.payload,
      };
    case "OBJECT_DETECTION":
      return {
        ...state,
        odRes: action.payload,
      };
    default:
      return state;
  }
};
export default AiReducer;
