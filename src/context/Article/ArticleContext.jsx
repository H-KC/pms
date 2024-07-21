import { createContext, useReducer } from "react";
import ArticleReducer from "./ArticleReducer";
import axios from "axios";
export const ArticleContext = createContext();
import { useEffect } from "react";
export const ArticleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ArticleReducer, {
    // each article will have a id: Integer title: String ,content: String, author: String, publication_date: Date ,photo: String
    articles: [],
    article: null,
    current: null,
    myArticles: [],
    loading: true,
    error: null,
  });
  useEffect(() => {
    getArticles();
  }, []);
  // backend api takes in a token for authentication and returns a list of articles

  const getArticles = async () => {
    try {
      const res = await axios.get("/api/articles", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "GET_ARTICLES",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "ARTICLE_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // get my Articles
  const getMyArticles = async (id) => {
    try {
      const res = await axios.get(`/api/articles/my/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      dispatch({
        type: "ARTICLE_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getArticle = async (id) => {
    try {
      const res = await axios.get(`/api/articles/${id}`);
      dispatch({
        type: "GET_ARTICLE",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "ARTICLE_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addArticle = async (article) => {
    try {
      const res = await axios.post("/api/articles", article, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "ADD_ARTICLE",
        payload: res.data,
      });
      dispatch({
        type: "GET_MY_ARTICLES",
        payload: res.data,
      });
      // navigate("/articles");
    } catch (error) {
      dispatch({
        type: "ARTICLE_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // update article
  const updateArticle = async (article) => {
    try {
      const res = await axios.put(`/api/articles/${article._id}`, article, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "UPDATE_ARTICLE",
        payload: res.data,
      });
      // navigate("/articles");
    } catch (error) {
      dispatch({
        type: "ARTICLE_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deleteArticle = async (id) => {
    try {
      const res = await axios.delete(`/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: "DELETE_ARTICLE",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "ARTICLE_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articles: state.articles,
        article: state.article,
        myArticles: state.myArticles,
        loading: state.loading,
        error: state.error,
        current: state.current,
        getArticles,
        getArticle,
        addArticle,
        deleteArticle,
        getMyArticles,
        updateArticle,
        dispatch,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
