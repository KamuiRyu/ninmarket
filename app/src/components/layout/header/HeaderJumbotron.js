import React from "react";
import jumbotronBG from "../../../assets/images/JumbotronBG.png";
import "../../../assets/styles/headerJumbotron.css";

function HeaderJumbotron(props) {
  return (
    <div className={`${props.classTo}`}>
      <section
        className={`bg-no-repeat bg-center relative w-full z-10 ${props.height}`}
        style={{
          backgroundImage: `url(${jumbotronBG})`,
        }}
      >
        <div
          className={`py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16 h-full flex justify-center items-center w-full`}
        >
          {props.children}
        </div>
      </section>
    </div>
  );
}

export default HeaderJumbotron;
