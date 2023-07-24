import React, { useState, useEffect, useRef } from "react";
import "../../../assets/styles/components/languageSwitch.css";
import { GB } from "country-flag-icons/react/3x2";
import { BR } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

export default function LanguagePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const langMenuRef = useRef();
  const { i18n } = useTranslation();
  let localLanguage = localStorage.getItem("language");

  useEffect(() => {
    function handleOutsideClick(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function toggleLangMenu() {
    setIsOpen(!isOpen);
  }

  const handleChangeLanguage = (language) => {
    if (language !== localLanguage) {
      localStorage.setItem("language", language);
      i18n.changeLanguage(language);
    }
    setIsOpen(false);
  };
  let languageContent;
  switch (localLanguage) {
    case "en":
      languageContent = (
        <>
          <GB title="United States" className="..." />
          EN
        </>
      );
      break;
    case "pt":
      languageContent = (
        <>
          <BR title="Portuguese" className="..." />
          BR
        </>
      );
      break;
    default:
      languageContent = (
        <>
          <GB title="United States" className="..." />
          EN
        </>
      );
      break;
  }

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
}
