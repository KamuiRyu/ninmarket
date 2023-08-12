import { useState,  } from "react";
import { useTranslation } from "react-i18next";



export function useAuthModal() {
  const [currentAuthPage, setCurrentAuthPage] = useState("login");
  const [isModalTerms, setIsModalTerms] = useState(false);
  const [isModalPolicy, setIsModalPolicy] = useState(false);

  const handlePageChange = (page) => {
    setCurrentAuthPage(page);
  };

  const handleModalTerms = () => {
    setIsModalTerms(true);
  };

  const handleModalTermsClose = () => {
    setIsModalTerms(false);
  };

  const handleModalPolicy = () => {
    setIsModalPolicy(true);
  };

  const handleModalPolicyClose = () => {
    setIsModalPolicy(false);
  };

  const { t } = useTranslation();


  return {
    currentAuthPage,
    handlePageChange,
    isModalTerms,
    handleModalTerms,
    handleModalTermsClose,
    isModalPolicy,
    handleModalPolicy,
    handleModalPolicyClose,
    t
  };
}