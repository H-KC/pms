import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { AuthContext } from "../../context/Auth/AuthContext";
// this component should take the article id from the url and get article by id

const Article = () => {
  const articleContext = useContext(ArticleContext);
  const { article, getArticle } = articleContext;
  const { users, getUsers } = useContext(AuthContext);

  const location = useLocation();
  // const [article, setArticle] = useState(null);
  useEffect(() => {
    getUsers();
    const id = location.pathname.split("/")[2];
    // const article = articles.find((article) => article._id === parseInt(id));
    // setArticle(article);
    getArticle(id);
  }, [location]);

  return (
    <div>
      {/* show article */}
      {article && users.length > 0 ? (
        <div
          style={
            {
              // float to center
            }
          }
        >
          <img
            style={{
              height: "300px",
              width: "300px",
              objectFit: "cover",
              // float to center
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              float: "center",
            }}
            src={article.photo}
            alt="article"
          />

          <h1
            style={{
              margin: "4px",
              color: "#3f51b5",
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              margin: "4px",
            }}
          >
            {article.content}
          </p>
          <p
            style={{
              margin: "4px",
            }}
          >
            {users.find((user) => user._id === article.author).name ||
              "loading"}
          </p>
          <p>{article.publication_date.split("T")[0]}</p>
        </div>
      ) : (
        <div>
          <p>No article found</p>
        </div>
      )}
    </div>
  );
};

export default Article;
