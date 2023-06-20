import React from "react";
import jumbotronBG from "../../../assets/images/JumbotronBG.png";

function HeaderJumbotron(props) {
    return (
        <div className={`${props.classTo}`}>
            <section
                className={`bg-no-repeat static w-full ${props.height}`}
                style={{
                    backgroundImage: `url(${jumbotronBG})`,
                }}
            >
                <div
                    className={`py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16 h-full flex justify-center items-center`}
                >
                    {props.children}
                </div>
            </section>
        </div>
    );
}

export default HeaderJumbotron;
