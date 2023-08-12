import React from "react";
import useMyProfile from "./useMyProfile";
import "../../../../assets/styles/pages/Profile/MyProfile/MyProfileHeader/MyProfileHeader.css";

export default function MyProfileHeader() {
  const { BG } = useMyProfile();
  return (
    <section className="user-profile-header">
      <div className="user-profile-parallax">
        <div className="user-profile-parallax-bg">
          <img src={BG} alt="background" />
        </div>
      </div>
    </section>
  );
}
