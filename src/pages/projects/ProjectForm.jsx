import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import { ProjectContext } from "../../context/Project/ProjectContext";

const ProjectForm = () => {
  const { addProject, updateProject, current } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState({
    title: "",
    description: "",
    keywords: "",
    duration: "",
    budget: "",
    initial_amount: "",
    steps: "",
    payment_systems: "",
  });

  const {
    title,
    description,
    keywords,
    duration,
    budget,
    initial_amount,
    steps,
    payment_systems,
  } = project;

  useEffect(() => {
    if (current !== null) {
      setProject(current);
    } else {
      setProject({
        title: "",
        description: "",
        keywords: "",
        duration: "",
        budget: "",
        initial_amount: "",
        steps: "",
        payment_systems: "",
      });
    }
  }, [current]);

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      project.client_code = user._id;
      addProject(project);
    } else {
      updateProject(project);
    }
    setProject({
      title: "",
      description: "",
      keywords: "",
      duration: "",
      budget: "",
      initial_amount: "",
      steps: "",
      payment_systems: "",
    });
  };

  return (
    <Box>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={description}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Keywords"
          name="keywords"
          value={keywords}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Duration"
          name="duration"
          value={duration}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Budget"
          name="budget"
          value={budget}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Initial Amount"
          name="initial_amount"
          value={initial_amount}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Steps"
          name="steps"
          value={steps}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Payment Systems"
          name="payment_systems"
          value={payment_systems}
          onChange={onChange}
          fullWidth
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#007FFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {
            // if current is not null then update else add
            current !== null ? "Update" : "Add"
          }
        </button>
      </form>
    </Box>
  );
};

export default ProjectForm;
