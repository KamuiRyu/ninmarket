import React from "react";
import jumbotronBG from "../../../assets/images/JumbotronBG.png";
import "../../../assets/styles/headerJumbotron.css";

function HeaderJumbotron(props) {
  return (
    <section className="headerBG">
      <div className={`content ${props.classTo} z-10`}></div>
    </section>
  );
}

export default HeaderJumbotron;
