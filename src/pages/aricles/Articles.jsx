import { useContext, useEffect } from "react";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import "./articles.css";
import { useNavigate } from "react-router-dom";
// using material ui show articles
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
const Articles = () => {
  const articleContext = useContext(ArticleContext);
  const { articles, getArticles } = articleContext;
  const { getUsers, users } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
      await getArticles();
    };
    fetchData();
  }, []);
  const navigate = useNavigate();

  return (
    <>
      {articles && users.length > 0 ? (
        <div className="articles-style">
          {articles.map((article) => (
            <Card key={article._id} className="card-style">
              <CardActionArea
                onClick={() => {
                  navigate(`/articles/${article._id}`);
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={article.photo}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  {users.length > 0 &&
                    users.find((user) => user._id === article.author).name}
                </Button>
                <Button size="small" color="success">
                  {article.date}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <p>No articles found</p>
        </div>
      )}
    </>
  );
};

export default Articles;
