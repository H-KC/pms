import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useEffect, useContext, useState } from "react";

export default function ArticleTable() {
  const { getArticles, deleteArticle, dispatch, articles } =
    useContext(ArticleContext);
  const { user } = useContext(AuthContext);
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    // async function that sets the data
    async function fetchData() {
      // check iof the is user then fetch the data and set it

      await getArticles();
    }
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "content", headerName: "Content", width: 130 },
    { field: "author", headerName: "Author", width: 130 },
    { field: "publication_date", headerName: "Publication Date", width: 130 },
    { field: "photo", headerName: "Photo", width: 130 },
  ];
  const rows =
    articles && user
      ? articles
          .filter((article) => article.author === user._id)
          .map((article) => {
            return {
              id: article._id,
              title: article.title,
              content: article.content,
              author: user
                ? user._id === article.author
                  ? "You"
                  : article.author.username
                : article.author,
              publication_date: article.publication_date.split("T")[0],
              photo: article.photo,
            };
          })
      : [];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          onRowSelectionModelChange={(ids) => setSelectedRow(ids)}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
        {/* delete and update btns */}
      </div>
      {
        // the there is no row selected or more than one row selected hide the btns
        selectedRow && selectedRow.length === 1 ? (
          <div>
            <button
              style={btnStyle}
              onClick={() => {
                dispatch({
                  type: "SET_CURRENT",
                  payload: articles.find((row) => row._id === selectedRow[0]),
                });
              }}
            >
              Update
            </button>
            <button
              style={btnStyle}
              onClick={() => {
                deleteArticle(selectedRow[0]);
              }}
            >
              Delete
            </button>
          </div>
        ) : null
      }
    </>
  );
}

const btnStyle = {
  backgroundColor: "blue",
  color: "#fff",
  padding: "10px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
