import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { ProjectContext } from "../../context/Project/ProjectContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import InfoCard from "../../components/shared/InfoCard";
import ProjectTabs from "../../components/shared/ProjectTabs";
const Project = () => {
  const projectContext = useContext(ProjectContext);
  const { project, getProject } = projectContext;

  const [projectItem, setProjectItem] = useState(null);
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProject(projectId);
      setProjectItem(res);
    };
    fetchData();
    // setProjectItem(project);
  }, [projectId]);

  return (
    <>
      {project && (
        <div className="project">
          <Typography color="primary" level="h1" textAlign={"center"}>
            {project.title}
          </Typography>
          <div>
            {project.keywords.split(",").map((keyword, index) => (
              <Chip key={index} label={keyword} />
            ))}
            <Divider />
            <Typography level="body-md">{project.description}</Typography>
          </div>
          <div className="project-stats">
            <CardInvertedColors amount={project.budget} title={"Budget"} />

            <CardInvertedColors
              amount={project.initial_amount}
              title={"Initial Amount"}
            />
            <CardInvertedColors amount={135.6} title={"Gross Profit"} />
          </div>

          <Divider />

          <div className="project-footer">
            <ProjectTabs
              client={project.client_code}
              partner={project.partner_code}
              start_date={project.start_date}
              duration={project.duration}
            />
            <InfoCard
              data={project.steps}
              title="Steps"
              payment_systems={project.payment_systems}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;

// {

//         start_date: "2024-01-15",
//         duration: "12 months",
//
//
//         partner_code: ["PART001", "PART002"],
//         client_code: "CLI001",
//       }

function CardInvertedColors({ amount, title }) {
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={20}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">{title}</Typography>
          <Typography level="h2">{amount}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>
  );
}
