import React from "react";
import "./visit.css";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PaidIcon from "@mui/icons-material/Paid";
import FeedIcon from "@mui/icons-material/Feed";
import InsightsIcon from "@mui/icons-material/Insights";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";

import Tooltip from "@mui/material/Tooltip";

const Visit = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1>PMS- PROJECT MANAGEMENT SYSTEM</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            textAlign: "center",

            fontSize: "17px",
            color: "#282c34",
          }}
        >
          <div className="ions">
            <Tooltip title="Manage Projects">
              <AccountTreeIcon />
              <div>Projects</div>
            </Tooltip>
          </div>
          <div className="ions">
            <Tooltip title="Manage Payments">
              <PaidIcon /> <div>Payment</div>
            </Tooltip>
          </div>
          <div className="ions">
            <Tooltip title="Manage Articles">
              <FeedIcon />
              <div>Article</div>
            </Tooltip>
          </div>
          <div className="ions">
            <Tooltip title="Manage Users">
              <GroupsIcon />
            <div>Users</div>
            </Tooltip>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              fontSize: "17px",
              color: "#282c34",
            }}
          >
            <div className="ions-ai">
              <Tooltip title="AI NLP">
                <InsightsIcon />
              <div>Insights</div>
              </Tooltip>
            </div>
            <div className="ions-ai">
              <Tooltip title="AI Vision">
                <CameraEnhanceIcon />
              <div>Vision</div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visit;
