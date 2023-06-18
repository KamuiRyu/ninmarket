import React from "react";
import { Link } from "react-router-dom";

function Navbar({ openModal }) {
  return (
    <div className="Sticky-nav z-40">
      <div className="Menu-header">
        <nav>
          <div className="Nav-container">
            <div className="Navbar">
              <ul>
                <li className="float-right">
                  <button className="link-button" onClick={openModal}>Login</button>
                  
                </li>
                <li className="float-right">
                <Link to="/">Market</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
