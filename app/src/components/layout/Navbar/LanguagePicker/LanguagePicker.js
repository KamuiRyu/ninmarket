import React from "react";
import "../../../../assets/styles/components/Navbar/LanguagePicker/LanguagePicker.css";
import { GB } from "country-flag-icons/react/3x2";
import { BR } from "country-flag-icons/react/3x2";
import useLanguagePicker from "./useLanguagePicker";

const LanguagePicker = () => {
  const {
    isOpen,
    langMenuRef,
    toggleLangMenu,
    handleChangeLanguage,
    languageContent,
  } = useLanguagePicker();

  return (
    <>
      <div className={`lang-menu ${isOpen ? "active" : ""}`} ref={langMenuRef}>
        <div className="selected-lang" onClick={toggleLangMenu}>
          {languageContent}
        </div>
        <ul>
          <li>
            <button
              href="#"
              className="en"
              onClick={() => handleChangeLanguage("en")}
            >
              <GB title="English" className="..." />
              English
            </button>
          </li>
          <li>
            <button
              href=""
              className="pt"
              onClick={() => handleChangeLanguage("pt")}
            >
              <BR title="Portuguese" className="..." />
              Português
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LanguagePicker;