import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../context/Project/ProjectContext";
import "./projects.css";
import { useNavigate } from "react-router-dom";

// using material ui show projects
import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";

import Tooltip from "@mui/joy/Tooltip";

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  const { projects, getProjects } = projectContext;
  const navigate = useNavigate();
  const [projectsList, setProject] = useState(projects);
  useEffect(() => {
    const fetchData = async () => {
      await getProjects();
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="projects-style">
        {projects.map((project, index) => (
          <Card
            variant="solid"
            color="primary"
            invertedColors
            sx={{
              boxShadow: "lg",

              maxWidth: "100%",
              // to make the demo resizeable
              overflow: "auto",
              resize: "horizontal",
            }}
            key={index}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              Keywords:
              {
                // split the stirng into array and map through it to show the first and last keyword sepreated by ...
                project.keywords.split(",").map((keyword, index) => (
                  <Chip key={index} variant="outlined" color="neutral">
                    {keyword}
                  </Chip>
                ))
              }
            </Box>
            <Divider />
            <div>
              <Typography level="h2">
                ${project.budget}{" "}
                <Typography fontSize="sm" textColor="text.tertiary">
                  / {project.duration}
                </Typography>
              </Typography>
            </div>
            {/* show start date */}
            <Typography level="body-md">
              Start Date: {new Date(project.start_date).toDateString()}
            </Typography>
            <Divider />
            <CardContent>
              <Typography level="title-lg">{project.title}</Typography>
              <Typography level="body-md">{project.description}</Typography>
              <Divider />
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* //show only first step the horizontal line the last step */}
                Steps:
                <Typography level="body-md">
                  {
                    project.steps.split(",").map((step, index) => (
                      <Chip key={index} variant="outlined" color="neutral">
                        {step}
                      </Chip>
                    ))[0]
                  }
                </Typography>
                <Typography level="body-md">
                  <Tooltip
                    title={
                      //  convert array to string seperated by comma
                      project.steps
                    }
                    placement="top"
                  >
                    <span>...</span>
                  </Tooltip>
                </Typography>
                <Typography level="body-md">
                  {
                    project.steps.split(",").map((step, index) => (
                      <Chip key={index} variant="outlined" color="neutral">
                        {step}
                      </Chip>
                    ))[project.steps.split(",").length - 1]
                  }
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                Payment Systems:
                <Typography level="body-md">
                  {
                    project.payment_systems
                      .split(",")
                      .map((payment_system, index) => (
                        <Chip key={index} variant="outlined" color="neutral">
                          {payment_system}
                        </Chip>
                      ))[project.payment_systems.split(",").length - 1]
                  }
                </Typography>
                <Typography level="body-md">
                  <Tooltip
                    title={
                      //  convert array to string seperated by comma
                      project.payment_systems
                    }
                    placement="top"
                  >
                    <span>...</span>
                  </Tooltip>
                </Typography>
                <Typography level="body-md">
                  {
                    project.payment_systems
                      .split(",")
                      .map((payment_system, index) => (
                        <Chip key={index} variant="outlined" color="neutral">
                          {payment_system}
                        </Chip>
                      ))[project.payment_systems.split(",").length - 1]
                  }
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="solid"
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                View Project
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Projects;
