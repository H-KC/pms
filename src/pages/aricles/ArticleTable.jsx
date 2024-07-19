import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useEffect, useContext, useState } from "react";
// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function ArticleTable() {
  const { getMyArticles, myArticles, deleteArticle, dispatch } =
    useContext(ArticleContext);
  const { user } = useContext(AuthContext);
  const [arData, setArData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    // async function that sets the data
    async function fetchData() {
      // check iof the is user then fetch the data and set it
      if (user) {
        await getMyArticles(user._id);
        setArData(myArticles);
      }
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
  const rows = arData
    ? arData.map((article) => {
        return {
          id: article._id,
          title: article.title,
          content: article.content,
          author: 
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
                  payload: rows.find((row) => row.id === selectedRow[0]),
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
