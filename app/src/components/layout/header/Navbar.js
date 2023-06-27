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
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <button className="smartLink-button">
            <img src={Logo} alt="Nin Market" />
          </button>
        </div>
        <ul className="navbar-section grow">
          <li className="navbarBox-link">
            <button className="smartLink-button">
              <FontAwesomeIcon icon={faCartShopping} className="wfm-icon" />
              <div className="navbarBox-title">
                <span>Market</span>
              </div>
            </button>
          </li>

          {isLoggedIn && (
            <>
              <li className="navbar-separator"></li>
              <li className="navbarBox-link">
                <button className="smartLink-button">
                  <FontAwesomeIcon icon={faUser} className="wfm-icon" />
                  <div className="navbarBox-title">
                    <span>My profile</span>
                  </div>
                </button>
              </li>
              <li className="navbarBox-link">
                <button className="smartLink-button">
                  <FontAwesomeIcon icon={faEnvelope} className="wfm-icon" />
                  <div className="navbarBox-title">
                    <span>My Messages</span>
                  </div>
                </button>
              </li>
              <li className="navbar-box">
                <ul className="shift-5">
                  <li className="navbarBox-text">Select your status</li>
                  <li className="ninjaStatus-switch">
                    <span
                      onClick={() => handleStatusChange("online")}
                      className={`online-status ${
                        userStatusClass === "online" ? "active" : ""
                      }`}
                    >
                      Online
                    </span>
                    <span
                      onClick={() => handleStatusChange("ingame")}
                      className={`ingame-status ${
                        userStatusClass === "ingame" ? "active" : ""
                      }`}
                    >
                      Online in game
                    </span>
                    <span
                      onClick={() => handleStatusChange("invisible")}
                      className={`invisible-status ${
                        userStatusClass === "invisible" ? "active" : ""
                      }`}
                    >
                      Invisible
                    </span>
                  </li>
                  <li className="list-category">
                    <button className="smartLink-button" href="/settings">
                      <FontAwesomeIcon icon={faGear} className="wfm-icon" />
                      <div className="listTitle-category">
                        <span>Settings</span>
                      </div>
                    </button>
                  </li>
                  <li className="list-category">
                    <button
                      className="smartLink-button"
                      onClick={() => auth.logoutUser("action-user")}
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="wfm-icon"
                      />
                      <div className="listTitle-category">
                        <span>Sign out</span>
                      </div>
                    </button>
                  </li>
                </ul>
                <div className="navbarBox-title navbarBox-avatar">
                  {user.photo !== null ? (
                    <UserProfile
                      photo={user.photo}
                      imgAlt={`Photo ${user.name}`}
                      imgClass="userAvatar"
                    />
                  ) : (
                    <UserProfile
                      name={user.name}
                      imgClass="userAvatarName"
                    ></UserProfile>
                  )}

                  <div className="ninjaBox-status">
                    <span className="ninja-name">{user.name}</span>
                    <div className="ninja-status online-indicator">
                      <span className={`${userStatusClass}-status`}>
                        {userStatusClass}
                      </span>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    className="text-black wfm-icon icon-caret-left"
                  />
                </div>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="navbar-separator"></li>
              <li className="navbarBox-link">
                <button className="smartLink-button" onClick={props.openModal}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="wfm-icon"
                  />
                  <div className="navbarBox-title">
                    <span>Sign in</span>
                  </div>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
