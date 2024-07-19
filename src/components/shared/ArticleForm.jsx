import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { useState, useContext, useEffect } from "react";

const ArticleForm = () => {
  const { addArticle, updateArticle, current } = useContext(ArticleContext);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    photo: "",
  });
  const { title, content, photo } = article;
  const onChange = (e) =>
    setArticle({ ...article, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
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
  useEffect(() => {
    if (current !== null) {
      setArticle(current);
    } else {
      setArticle({
        title: "",
        content: "",
        photo: "",
      });
    }
  }, [current]);

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
          defaultValue={title}
          size="small"
          name="title"
          onChange={onChange}
        />
        <TextareaAutosize
          aria-label="Content"
          minRows={3}
          placeholder="Minimum 3 rows"
          name="content"
          defaultValue={content}
          onChange={onChange}
        />

        <TextField
          label="Photo Link"
          id="outlined-size-small"
          name="photo"
          size="Photo Link"
          defaultValue={photo}
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
