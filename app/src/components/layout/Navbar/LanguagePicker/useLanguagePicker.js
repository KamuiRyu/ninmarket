import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GB } from "country-flag-icons/react/3x2";
import { BR } from "country-flag-icons/react/3x2";

const useLanguagePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const langMenuRef = useRef();
  const { i18n } = useTranslation();
  const localLanguage = localStorage.getItem("language");

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

  const toggleLangMenu = () => {
    setIsOpen(!isOpen);
  };

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

  return {
    isOpen,
    langMenuRef,
    localLanguage,
    toggleLangMenu,
    handleChangeLanguage,
    languageContent,
  };
};

export default useLanguagePicker;
