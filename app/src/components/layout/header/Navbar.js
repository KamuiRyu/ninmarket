import React, { useState, useEffect } from "react";
import "../../../assets/styles/components/navbar.css";
import AuthServices from "../../../services/AuthServices";
import axios from "axios";
import UserProfile from "../../common/UserProfile";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import LanguagePicker from "./LanguagePicker";
import Modals from "../../common/Modal";
import languageSupport from "../../../utils/languageSupport";

function Navbar(props) {
  const { t } = useTranslation();

  const isLoggedIn = localStorage.getItem("auth_login")
    ? localStorage.getItem("auth_login")
    : false;
  const [switchStatus, setSwitchStatus] = useState("");
  const [userStatusClass, setUserStatusClass] = useState("");

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
        const token = await authToken.getAuthToken();
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
                "Authorization": "Bearer "+token
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
      setItemSearch(false);
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
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutOpen = () => {
    setLogoutModal(true);
  };

  const logoutClose = () => {
    setLogoutModal(false);
  };

  const [itemSearch, setItemSearch] = useState(false);
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [searchItemsFound, setSearchItemsFound] = useState([]);
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem("language");
    setLanguageUser(languageFromLocalStorage);
  }, [localStorage.getItem("language")]);

  const delayedHandleItemSearch = debounce(async (event) => {
    const language = languageSupport(languageUser);
    if (!language) {
      setLanguageUser("en");
    }
    const value = event.target.value;
    if (value !== "") {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/item/${value}/${languageUser}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
            mode: "cors",
          }
        );
        if (response.status === 200) {
          if (Array.isArray(response.data) && response.data.length === 0) {
            setItemSearch(false);
          } else {
            setSearchItemsFound(response.data);
            setItemSearch(true);
          }
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  }, 500);
  const handleItemSearch = (event) => {
    delayedHandleItemSearch(event);
  };

  const handleClearInput = () => {
    document.getElementById("itemSearch").value = "";
    setItemSearch(false);
  };

  const handleItemSelected = () => {
    setItemSearch(false);
  }

  const handleSearchValue = (item) => {
    document.getElementById("itemSearch").value = item.name[languageUser];
  }
  return (
    <>
      {logoutModal && (
        <Modals.ModalConfirm
          yesOnClick={() => auth.logoutUser("action-user")}
          noOnClick={logoutClose}
          yesText={t("navbar.logout.yes")}
          noText={t("navbar.logout.no")}
          title={t("navbar.logout.title")}
          onClose={logoutClose}
        ></Modals.ModalConfirm>
      )}
      <div className="sidebar" id="sidebar">
        <div className="logo-details">
          <div className="logo_name">
            <img src={Logo} alt="Logo" />
          </div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar} />
        </div>
        <LanguagePicker />
        <ul className="nav-list">
          <li
            className={`inputSearch${itemSearch ? " searched" : ""} ${
              itemSearch ? "show-clear-icon" : ""
            }`}
          >
            <i className="bx bx-search" onClick={toggleSidebar} />
            <input
              type="text"
              className="focus:outline-none focus:ring-0"
              placeholder={t("navbar.search")}
              onChange={handleItemSearch}
              onBlur={handleItemSelected}
              id="itemSearch"
            />
            {itemSearch && (
              <i className="bx bx-x clear-icon" onClick={handleClearInput} />
            )}
            <span className="tooltip">{t("navbar.search")}</span>
          </li>
          <div className={`resultBlock${itemSearch ? " active" : ""}`}>
            <ul className={`resultSearch`}>
              {searchItemsFound.map((item, index) => {
                const translatedType =
                  item.type[languageUser] || item.type["en"];
                const translatedName =
                  item.name[languageUser] || item.name["en"];

                return (
                  <Link to={`/items/${item.slug}`} key={index} onClick={() => handleSearchValue(item)}>
                    <li>
                      <div className="resultImg">
                        <img src={item.image_url} alt="item" />
                      </div>
                      <div className="resultInfo">
                        <span className={`resultType ${translatedType}`}>
                          {translatedType}
                        </span>
                        <span className="resultName">{translatedName}</span>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <li>
            <Link to="/" className="link-button">
              <i className="bx bxs-store"></i>
              <span className="links_name">{t("navbar.market")}</span>
            </Link>
            <span className="tooltip">{t("navbar.market")}</span>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/" className="link-button">
                  <i className="bx bxs-message-dots"></i>
                  <span className="links_name">{t("navbar.messages")}</span>
                </Link>
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
                        spanClass="font-bold"
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
                    onClick={logoutOpen}
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
