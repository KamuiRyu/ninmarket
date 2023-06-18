import React from "react";

function HeaderJumbotron(props) {
  return (
    <div className={`${props.classTo}`}>
      <section className={`bg-[url('./assets/images/JumbotronBG.png')] bg-no-repeat static w-full ${props.height}`}>
        <div className={`py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16 h-full flex justify-center items-center`}>
          {props.children}
        </div>
      </section>
    </div>
  );
}


export default HeaderJumbotron;
