import React from "react";
import UserTabs from "./UserTabs";
import "./profile.css";
import { ArticleContext } from "../../context/Article/ArticleContext";
import { ProjectContext } from "../../context/Project/ProjectContext";

import { useEffect, useContext } from "react";
const Profile = () => {
  const { getMyArticles, myArticles, deleteArticle, dispatch, articles } =
    useContext(ArticleContext);
  const { getMyProjects } = useContext(ProjectContext);

  return (
    <div className="user-profile">
      <div>
        <UserTabs />
      </div>
    </div>
  );
};

export default Profile;
