import { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ProjectContext } from "../../context/Project/ProjectContext";
import { AuthContext } from "../../context/Auth/AuthContext";

export const ProjectTable = () => {
  const { projects, getProjects, deleteProject, dispatch } =
    useContext(ProjectContext);
  const { user, getUsers } = useContext(AuthContext);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // async function that sets the data
    async function fetchData() {
      // check iof the is user then fetch the data and set it
      if (user) {
        await getProjects();
        await getUsers();
      }
    }
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "keywords", headerName: "Keywords", width: 130 },
    { field: "start_date", headerName: "Start Date", width: 130 },
    { field: "duration", headerName: "Duration", width: 130 },
    { field: "budget", headerName: "Budget", width: 130 },
    { field: "initial_amount", headerName: "Initial Amount", width: 130 },
    { field: "steps", headerName: "Steps", width: 130 },
    { field: "payment_systems", headerName: "Payment Systems", width: 130 },
    { field: "partner_code", headerName: "Partner Code", width: 130 },
    { field: "client_code", headerName: "Client Code", width: 130 },
  ];
  const rows = projects
    ? projects
        .filter((project) => project.client_code === user._id)
        .map((project) => {
          return {
            id: project._id ? project._id : "",
            title: project.title,
            description: project.description,
            // convert array  to a string
            keywords: project.keywords,
            start_date: project.start_date,
            duration: project.duration,
            budget: project.budget,
            initial_amount: project.initial_amount,
            steps: project.steps,
            payment_systems: project.payment_systems,
            partner_code: project.partner_code,
            client_code: project.client_code,
          };
        })
    : [];

  return (
    <>
      <div style={{ height: 400, width: "900px" }}>
        <DataGrid
          onRowSelectionModelChange={(ids) => setSelectedRow(ids)}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          scrollbarSize={5}
        />
      </div>
      {
        // the there is no row selected or more than one row selected hide the btns
        selectedRow && selectedRow.length === 1 ? (
          <div>
            <button
              style={btnStyle}
              onClick={() => {
                deleteProject(selectedRow[0]);
              }}
            >
              Delete
            </button>
            <button
              style={btnStyle}
              onClick={() => {
                dispatch({
                  type: "SET_CURRENT",
                  payload: projects.find((row) => row._id === selectedRow[0]),
                });
              }}
            >
              Update
            </button>
          </div>
        ) : null
      }
    </>
  );
};

// Project
// {
//         _id: "1",
//         title: "AI Research Project",
//         description:
//           "Exploring advanced AI algorithms for autonomous vehicles.",
//         keywords: ["AI", "autonomous vehicles", "machine learning"],
//         start_date: "2024-01-15",
//         duration: "12 months",
//         budget: 1000000.0,
//         initial_amount: 250000.0,
//         steps: ["Research", "Development", "Testing", "Deployment"],
//         payment_systems: ["PayPal", "Stripe"],
//         partner_code: ["PART001", "PART002"],
//         client_code: "CLI001",
//       }

const btnStyle = {
  backgroundColor: "blue",
  color: "#fff",
  padding: "10px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
