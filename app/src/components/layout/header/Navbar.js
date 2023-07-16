import React, { useState, useEffect } from "react";
import "../../../assets/styles/navbar.css";
import AuthServices from "../../../services/AuthServices";
import axios from "axios";
import UserProfile from "../../common/UserProfile";
import { useTranslation } from "react-i18next";
import ukFlag from "../../../assets/images/uk.png";
import brFlag from "../../../assets/images/br.png";

function Navbar(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isLoggedIn = localStorage.getItem("auth_login")
    ? localStorage.getItem("auth_login")
    : false;
  const [switchStatus, setSwitchStatus] = useState("");
  const [userStatusClass, setUserStatusClass] = useState("");
  const handleChangeLanguage = (language) => {
    const localLanguage = localStorage.getItem("auth_language");
    if (language !== localLanguage) {
      localStorage.setItem("auth_language", language);
      i18n.changeLanguage(language);
    }
  };
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
    setIsSwitchActive(!isSwitchActive);
  };
  function closeOverlay(event) {
    if (isLoggedIn) {
      const popup = document.getElementById("profile-popup");
      const isPopupOpen = popup.classList.contains("show");
      if (
        isPopupOpen &&
        event.target !== popup &&
        !popup.contains(event.target)
      ) {
        setIsInfoVisible(false);
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
    if (status !== userStatusClass) {
      try {
        const authToken = new AuthServices();
        const csrfData = await authToken.fetchCSRFToken();
        const checkAuth = await authToken.checkAuthTokenExpiration();
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
              status: status,
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
            setIsInfoVisible(false);
            setIsSwitchActive(false);
          } else {
            console.log(response);
          }
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
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
      setIsInfoVisible(false);
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
      setIsInfoVisible(false);
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
        <div className="change-language">
          <div className="grid-container">
            <button onClick={() => handleChangeLanguage("en")}>
              <img
                src={ukFlag}
                className="en-language"
                alt="Change language to English"
              />
            </button>
            <button onClick={() => handleChangeLanguage("pt")}>
              <img
                src={brFlag}
                className="br-language"
                alt="Trocar idioma para Português"
              />
            </button>
          </div>
        </div>

        <ul className="nav-list">
          <li>
            <i className="bx bx-search" onClick={toggleSidebar} />
            <input type="text" placeholder={t("navbar.search")} />
            <span className="tooltip">{t("navbar.search")}</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-store"></i>
              <span className="links_name">{t("navbar.market")}</span>
            </a>
            <span className="tooltip">{t("navbar.market")}</span>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <a href="#">
                  <i className="bx bxs-message-dots"></i>
                  <span className="links_name">{t("navbar.messages")}</span>
                </a>
                <span className="tooltip">{t("navbar.messages")}</span>
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
                    {user.photo !== "" ? (
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
                  </div>
                  <div className="profile-user">
                    <div className="name">{user.name}</div>
                    <div
                      className={`status`}
                      onClick={() => toggleStatusSwitch()}
                    >
                      {userStatusClass === "online" &&
                        t("navbar.status.onlineShort")}
                      {userStatusClass === "ingame" &&
                        t("navbar.status.ingameShort")}
                      {userStatusClass === "invisible" &&
                        t("navbar.status.invisibleShort")}
                    </div>
                  </div>
                </div>
                <div className="profile-popup" id="profile-popup">
                  <div className="profile-popup-avatar">
                    <div className="profile-popup-bg"></div>
                    {user.photo !== "" ? (
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
                  </div>
                  <div className="profile-popup-info">
                    <p className="profile-popup-username">{user.name}</p>
                    <p className="profile-popup-email">{user.email}</p>
                    <div className="profile-popup-separator"></div>
                    <div
                      className={`profile-popup-status ${
                        isSwitchActive ? "active" : ""
                      }`}
                      id="profile-popup-status"
                      onClick={toggleInfoVisibility}
                    >
                      <span className={`status-dot status-${user.status}`} />
                      <div className="status-container">
                        <span className="status-text">
                          {user.status === "online" &&
                            t("navbar.status.online")}
                          {user.status === "ingame" &&
                            t("navbar.status.ingame")}
                          {user.status === "invisible" &&
                            t("navbar.status.invisible")}
                        </span>
                        <i className="bx bx-chevron-right arrow-icon status-switch"></i>
                      </div>
                    </div>
                  </div>
                  {isInfoVisible && (
                    <div
                      className="profile-popup-status-switch"
                      id="profile-popup-status-switch"
                    >
                      <div
                        className="profile-popup-status"
                        onClick={() => handleStatusChange("online")}
                      >
                        <span className={`status-dot status-online`} />
                        <div className="status-container">
                          <span className="status-text">
                            {t("navbar.status.online")}
                          </span>
                        </div>
                      </div>
                      <div className="profile-popup-separator"></div>
                      <div
                        className="profile-popup-status"
                        onClick={() => handleStatusChange("ingame")}
                      >
                        <span className={`status-dot status-ingame`} />
                        <div className="status-container">
                          <span className="status-text">
                            {t("navbar.status.ingame")}
                          </span>
                        </div>
                      </div>
                      <div
                        className="profile-popup-status"
                        onClick={() => handleStatusChange("invisible")}
                      >
                        <span className={`status-dot status-invisible`} />
                        <div className="status-container">
                          <span className="status-text">
                            {t("navbar.status.invisible")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
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
                  <div className="label">{t("navbar.signin")}</div>
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
