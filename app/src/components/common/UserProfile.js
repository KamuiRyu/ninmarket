import React from "react";

function UserProfile(props) {
  return (
    <div className={props.divClass}>
      {props.photo ? (
        <img src={props.photo} alt={props.imgAlt} className={props.imgClass} />
      ) : (
        <div className={`initials ${props.imgClass}`}>
          <span>{props.name && props.name.charAt(0).toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
