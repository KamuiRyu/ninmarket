import React, { useState, useEffect } from "react";
import "../../../assets/styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faRightFromBracket,
  faCaretLeft,
  faEnvelope,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../assets/images/logo.png";
import AuthServices from "../../../services/AuthServices";
import UserProfile from "../../common/UserProfile";
import axios from "axios";
import UserExample from "../../../assets/images/user_example.png";

function Navbar(props) {
  const isLoggedIn = localStorage.getItem("auth_login");
  const [userStatusClass, setUserStatusClass] = useState("");

  useEffect(() => {
    const userStatus = localStorage.getItem("auth_status");
    if (userStatus) {
      setUserStatusClass(userStatus);
    }
  }, []);
  const handleStatusChange = async (status) => {
    try {
      const authToken = new AuthServices();
      const csrfData = await authToken.fetchCSRFToken();
      const checkAuth = await authToken.checkAuthTokenExpiration();
      console.log(checkAuth);
      if (csrfData.csrfToken && checkAuth.auth_token === true) {
        axios.defaults.withCredentials = true;
        const userData = {
          id: localStorage.getItem("auth_id"),
          email: localStorage.getItem("auth_email"),
          status: localStorage.getItem("auth_status"),
        };
        const response = await axios.patch(
          process.env.REACT_APP_API_URL +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/users/",
          {
            where: "status-update",
            email: userData.email,
            status: userData.status,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "xsrf-token": csrfData.csrfToken,
            },
            credentials: "include",
            mode: "cors",
          }
        );
        if (response.data.success) {
          localStorage.setItem("auth_status", status);
          setUserStatusClass(status);
        } else {
          console.log(response);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };
  const user = {
    name: localStorage.getItem("auth_name"),
    photo:
      localStorage.getItem("auth_photo") !== "undefined"
        ? localStorage.getItem("auth_photo")
        : null,
    status: localStorage.getItem("auth_status"),
  };
  const auth = new AuthServices();

  const toggleSidebar = () => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    sidebar.classList.toggle("open");
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  };
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon" />
          <div className="logo_name">CodingLab</div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar} />
        </div>
        <ul className="nav-list">
          <li>
            <i className="bx bx-search" onClick={toggleSidebar} />
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-grid-alt" />
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-user" />
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">User</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-chat" />
              <span className="links_name">Messages</span>
            </a>
            <span className="tooltip">Messages</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2" />
              <span className="links_name">Analytics</span>
            </a>
            <span className="tooltip">Analytics</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-folder" />
              <span className="links_name">File Manager</span>
            </a>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cart-alt" />
              <span className="links_name">Order</span>
            </a>
            <span className="tooltip">Order</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart" />
              <span className="links_name">Saved</span>
            </a>
            <span className="tooltip">Saved</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog" />
              <span className="links_name">Setting</span>
            </a>
            <span className="tooltip">Setting</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <img src={UserExample} alt="profileImg" />
              <div className="profile-user">
                <div className="name">{user.name}</div>
                <div className={`status ${userStatusClass}-status`}>
                  {userStatusClass}
                </div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
