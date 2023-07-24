import React from "react";
import "../../../assets/styles/components/headerJumbotron.css";

function HeaderJumbotron(props) {
  return (
    <section className="headerBG">
      <div className={`content ${props.classTo}`}></div>
      {props.children}
    </section>
  );
}

export default HeaderJumbotron;
