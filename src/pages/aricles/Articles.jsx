import { useContext } from "react";
import { ArticleContext } from "../../context/Article/ArticleContext";
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
  const { articles } = articleContext;
  const navigate = useNavigate();

  return (
    <>
      {articles ? (
        <div className="articles-style">
          {articles.map((article) => (
            <Card key={article.id} className="card-style">
              <CardActionArea
                onClick={() => {
                  navigate(`/articles/${article.id}`);
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
                  {article.author}
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
