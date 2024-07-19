import { createContext, useReducer } from "react";
import ArticleReducer from "./ArticleReducer";
import axios from "axios";
export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ArticleReducer, {
    // each article will have a id: Integer title: String ,content: String, author: String, publication_date: Date ,photo: String
    articles: [
      {
        id: 1,
        title: "Article 1",
        content: "Content 1",
        author: "Author 1",
        publication_date: "2021-07-01",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Article 2",
        content: "Content 2",
        author: "Author 2",
        publication_date: "2021-07-02",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Article 3",
        content: "Content 3",
        author: "Author 3",
        publication_date: "2021-07-03",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        title: "Article 4",
        content: "Content 4",
        author: "Author 4",
        publication_date: "2021-07-04",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: 5,
        title: "Article 5",
        content: "Content 5",
        author: "Author 5",
        publication_date: "2021-07-05",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: 6,
        title: "Article 6",
        content: "Content 6",
        author: "Author 6",
        publication_date: "2021-07-06",
        photo: "https://via.placeholder.com/150",
      },
    ],
    article: {},
    current: null,
    myArticles: [],
    loading: true,
    error: null,
  });
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
      dispatch({
        type: "GET_MY_ARTICLES",
        payload: res.data,
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
      const res = await axios.put(`/api/articles/${article.id}`, article, {
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
        payload: id,
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
