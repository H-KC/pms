import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ProjectContext } from "../../context/Project/ProjectContext";
import Flicking from "@egjs/react-flicking";

const ProjectsSlider = () => {
  return (
    <>
      {/* use bootrap to show an example of the home page */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "300%",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <h1>WELCOME TO PMS</h1>
        <p>This is v:1.1.0</p>
      </div>
    </>
  );
};

export default ProjectsSlider;
