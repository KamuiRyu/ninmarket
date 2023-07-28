import React from "react";
import "../../../assets/styles/components/Navbar/Navbar.css";
import UserProfile from "../../common/UserProfile";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import LanguagePicker from "./LanguagePicker";
import Modals from "../../common/Modals/";
import useNavbar from "./useNavbar";

export default function Navbar(props) {
  const {
    isLoggedIn,
    userStatusClass,
    isInfoVisible,
    isSwitchActive,
    toggleInfoVisibility,
    handleStatusChange,
    user,
    toggleStatusSwitch,
    toggleSidebar,
    handleProfileClick,
    logoutModal,
    handleItemSearch,
    itemSearch,
    searchItemsFound,
    handleClearInput,
    handleItemSelected,
    handleSearchValue,
    logoutClose,
    auth,
    t,
    languageUser,
    logoutOpen,
  } = useNavbar(props.openModal);

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
                  <Link
                    to={`/items/${item.slug}`}
                    key={index}
                    onClick={() => handleSearchValue(item)}
                  >
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
