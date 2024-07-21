import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";

const ArticleForm = () => {
  const { addArticle, updateArticle, current } = useContext(ArticleContext);
  const { user } = useContext(AuthContext);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    photo: "",
  });
  const { title, content, photo } = article;
  const onChange = (e) =>
    setArticle({ ...article, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    if (current === null) {
      article.author = user._id;
      console.log(article);
      addArticle(article);
    } else {
      updateArticle(article);
    }

    setArticle({
      title: "",
      content: "",
      photo: "",
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="title"
          id="outlined-size-small"
          value={title}
          size="small"
          name="title"
          onChange={onChange}
        />
        <TextareaAutosize
          aria-label="Content"
          minRows={3}
          placeholder="Minimum 3 rows"
          name="content"
          value={content}
          onChange={onChange}
        />

        <TextField
          label="photo"
          id="outlined-size-small"
          name="photo"
          size="small"
          value={photo}
          onChange={onChange}
        />
        <button
          onClick={onSubmit}
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {current ? "Update" : "Add"}
        </button>
      </div>
    </Box>
  );
};
export default ArticleForm;
