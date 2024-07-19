const ArticleReducer = (state, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        ...state,
        articles: action.payload,
        loading: false,
      };
    case "GET_ARTICLE":
      return {
        ...state,
        article: action.payload,
        loading: false,
      };
    case "GET_MY_ARTICLES":
      return {
        ...state,
        myArticles: action.payload,
        loading: false,
      };
    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [action.payload, ...state.articles],
        loading: false,
        current: null,
      };
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
        loading: false,
      };
    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === action.payload._id ? action.payload : article
        ),
        loading: false,
        current: null,
      };
      case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      };
    case "ARTICLE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ArticleReducer;
