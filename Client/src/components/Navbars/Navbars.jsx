import {
  Logout,
  AutoAwesomeMosaicOutlined,
  VoiceChat,
  NotificationsNone,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbars.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/AuthAction";

const Navbars = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="Navbars">
      <div className="navbar-item">
        <Link
          to={"../home"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <AutoAwesomeMosaicOutlined className="navbar-icon" />
        </Link>
      </div>

      <div className="navbar-item">
        <VoiceChat className="navbar-icon" />
        {/* <span>1</span> */}
      </div>

      <div className="navbar-item">
        <NotificationsNone className="navbar-icon" />
        {/* <span>1</span> */}
      </div>

      <div className="navbar-item" onClick={handleLogout}>
        <Logout className="navbar-icon" />
      </div>
    </div>
  );
};

export default Navbars;
