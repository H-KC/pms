import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  FaHome,
  FaBook,
  FaProjectDiagram,
  FaUser,
  FaBell,
  // login and logout and register icons
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";

import "./SideBar.css";
const SideBar = () => {
  const { loadUser, user, logout } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    setUserState(user);
  }, []);

  const [userState, setUserState] = useState(null);
  return (
    <>
      <div
        className="sideBar-user"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5rem",
          fontSize: "1.5rem",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {userState ? userState.name : "PMS"}
      </div>
      <div className="sideBar-Menu">
        <ul>
          <li>
            <Link to="/">
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/articles">
              <FaBook /> <span>Articles</span>
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <FaProjectDiagram /> <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaUser /> <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <FaBell /> <span>Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sideBar-options">
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/logout" onClick={logout}>
                  <FaSignOutAlt /> <span>Logout</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUser /> <span>Profile</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUserPlus /> <span>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
