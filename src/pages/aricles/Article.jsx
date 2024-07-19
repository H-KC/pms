import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArticleContext } from "../../context/Article/ArticleContext";

// this component should take the article id from the url and get article by id

const Article = () => {
  const articleContext = useContext(ArticleContext);
  const { articles } = articleContext;
  const location = useLocation();
  const [article, setArticle] = useState(null);
  useEffect(() => {
    const id = location.pathname.split("/")[2];
    const article = articles.find((article) => article.id === parseInt(id));
    setArticle(article);
  }, [location, articles]);

  return (
    <div>
      {/* show article */}
      {article ? (
        <div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <p>{article.author}</p>
          <p>{article.publication_date}</p>
          <img src={article.photo} alt="article" />
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
