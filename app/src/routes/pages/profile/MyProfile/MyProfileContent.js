import React from "react";
import useMyProfile from "./useMyProfile";
import { Link, Outlet, useParams } from "react-router-dom";
import "../../../../assets/styles/pages/Profile/MyProfile/MyProfileContent/MyProfileContent.css";
import UserProfile from "../../../../components/common/UserProfile/";
import FormElements from "../../../../components/common/FormElements";

export default function MyProfileContent() {
  const { userName } = useParams();
  const { getCurrentTab, t, userData, lastSeen } = useMyProfile(userName);
  const currentTab = getCurrentTab();
  return (
    <main className="user-profile-content">
      {userData && (
        <>
          <header className="user-content-header">
            <div className="flex-left"></div>
            <div className="user-content-header-container">
              <div className="row h-100">
                <div className="flex flex-col justify-center w-full sm:w-7/12 md:w-7/12 lg:w-6/12">
                  <div className="row">
                    <div className="profile-avatar flex-shrink-0">
                      {userData.user.photo !== "" ? (
                        <UserProfile
                          photo={userData.user.photo}
                          imgAlt={`Photo ${userData.name}`}
                          divClass="profile-avatar-block"
                        />
                      ) : (
                        <UserProfile
                          name={userData.user.name}
                          imgClass="userAvatarName"
                          divClass="profile-avatar-block"
                        ></UserProfile>
                      )}
                      <div className="profile-user-status">
                        <span className={`status-${userData.user.status}`}>
                          {userData.user.status === "invisible"
                            ? t("profile.invisibleStatus")
                            : userData.user.status === "ingame"
                            ? t("profile.ingameStatus")
                            : userData.user.status === "online"
                            ? t("profile.onlineStatus")
                            : t("profile.onlineStatus")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center ml-6">
                      <div className="row align-center">
                        <div className="profile-user-name ml-1">
                          <div className="profile-user-name-box">
                            {userData.user.name}
                          </div>
                          {userData.user.status === "invisible" && (
                            <span className="profile-user-lastseen">
                              <b>{t("profile.lastSeen")}&nbsp;</b>

                              <span>{lastSeen}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap profile-user-stats w-full sm:w-5/12 md:w-5/12 lg:w-6/12">
                  <div className="row">
                    <div className="w-1/4 sm:w-1/2 lg:w-1/4">
                      <div className="profile-user-stats-number">
                        {userData.user.reputation}
                      </div>
                      <div className="profile-user-stats-label">
                        {t("profile.reputation")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-right"></div>
          </header>
          <div className="user-profile-header-tabs">
            <div className="flex-left"></div>
            <div className="user-profile-header-container">
              <section className="user-profile-description">
                <div className="user-profile-description-about">
                  <div className="user-profile-about"></div>
                </div>
                {userData.autoProfile ? (
                  <div className="user-profile-edit-button">
                    <FormElements.ButtonForm
                      classButton="formBtn rounded-none w-full h-[50px] p-2"
                      classButtonHover="hover:bg-indigo-600"
                      classButtonFocus="focus:outline-none"
                      classButtonAnimation="duration-100 ease-in-out"
                    >
                      <i className='bx bx-edit mr-2'></i>
                      {t("profile.editProfile")}
                    </FormElements.ButtonForm>
                  </div>
                ) : null}
              </section>
              <div className="row user-profile-tabs">
                <ul className="profile-tabs">
                  <li className={currentTab === "orders" ? "active" : ""}>
                    <Link to="">{t("profile.ordersPage.title")}</Link>
                  </li>
                  <li className={currentTab === "statistics" ? "active" : ""}>
                    <Link to={`/profile/${userName}/statistics`}>{t("profile.transactionsPage")}</Link>
                  </li>
                  <li className={currentTab === "reviews" ? "active" : ""}>
                    <Link to={`/profile/${userName}/reviews`}>{t("profile.reputationsPage")}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-right"></div>
          </div>
          <div className="user-profile-content-tab">
            <Outlet context={userData}/>
          </div>
        </>
      )}
    </main>
  );
}
