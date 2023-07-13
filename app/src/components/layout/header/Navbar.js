import React, { useState, useEffect } from "react";
import "../../../assets/styles/navbar.css";
import AuthServices from "../../../services/AuthServices";
import axios from "axios";
import UserExample from "../../../assets/images/user_example.png";

function Navbar(props) {
  const isLoggedIn = localStorage.getItem("auth_login") ? localStorage.getItem("auth_login") : false;
  const [switchStatus, setSwitchStatus] = useState("");
  const [userStatusClass, setUserStatusClass] = useState("");

  function closeOverlay(event) {
    if (isLoggedIn) {
      const popup = document.getElementById("profile-popup");
      const isPopupOpen = popup.classList.contains("show");
      if (
        isPopupOpen &&
        event.target !== popup &&
        !popup.contains(event.target)
      ) {
        popup.classList.remove("show");
      }
    }
  }
  if (isLoggedIn) {
    document.addEventListener("click", closeOverlay);
  }

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
          setSwitchStatus(false);
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
    email: localStorage.getItem("auth_email"),
    photo:
      localStorage.getItem("auth_photo") !== "undefined"
        ? localStorage.getItem("auth_photo")
        : null,
    status: localStorage.getItem("auth_status"),
  };

  const auth = new AuthServices();

  const toggleStatusSwitch = () => {
    if (switchStatus === true) {
      setSwitchStatus(false);
    } else {
      setSwitchStatus(true);
    }
  };

  const toggleSidebar = () => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");

    if (isLoggedIn) {
      const popup = document.getElementById("profile-popup");
      popup.classList.remove("show");
    }
    sidebar.classList.toggle("open");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  };
  function handleProfileClick(event) {
    const popup = document.getElementById("profile-popup"),
      sidebar = document.getElementById("sidebar");
    if (sidebar.classList.contains("open")) {
      popup.classList.toggle("show");
    }
    event.stopPropagation();
  }
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon" />
          <div className="logo_name">NinMarket</div>
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
              <i className="bx bxs-store"></i>
              <span className="links_name">Market</span>
            </a>
            <span className="tooltip">Market</span>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <a href="#">
                  <i className="bx bxs-message-dots"></i>
                  <span className="links_name">My messages</span>
                </a>
                <span className="tooltip">My messages</span>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-cog" />
                  <span className="links_name">Setting</span>
                </a>
                <span className="tooltip">Setting</span>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="profile">
                <div
                  className="profile-details"
                  onClick={handleProfileClick}
                  id="profile-details"
                >
                  <div
                    className={`profile-image-container ${userStatusClass}-status`}
                  >
                    <img src={UserExample} alt="profileImg" />
                  </div>
                  <div className="profile-user">
                    <div className="name">{user.name}</div>
                    <div
                      className={`status`}
                      onClick={() => toggleStatusSwitch()}
                    >
                      {userStatusClass}
                    </div>
                  </div>
                </div>
                <div className="profile-popup" id="profile-popup">
                  <div className="profile-popup-avatar">
                    <div className="profile-popup-bg"></div>
                    <img src={UserExample} alt="profileImg" />
                  </div>
                  <div className="profile-popup-info">
                    <p className="profile-popup-username">{user.name}</p>
                    <p className="profile-popup-email">{user.email}</p>
                    <p className="profile-popup-separator"></p>
                    <p className="profile-popup-email">{user.status}</p>
                  </div>
                </div>
                <div className="profile-options">
                  <i className="bx bxs-cog iconBtn" />
                  <i
                    className="bx bx-log-out-circle iconBtn"
                    onClick={() => auth.logoutUser("action-user")}
                  />
                </div>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li className="signin" onClick={props.openModal}>
                <div className="signin-details">
                  <i className="bx bx-log-in-circle" id="btnSignIn" />
                  <div className="label">Signin</div>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
