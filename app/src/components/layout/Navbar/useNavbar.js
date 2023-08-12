import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AuthServices from "../../../services/AuthServices";
import languageSupport from "../../../utils/languageSupport";
import { UserContext } from "../../../providers/userContext";

const useNavbar = () => {
  const { t } = useTranslation();
  const auth = new AuthServices();
  const { user, logout, updateUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [switchStatus, setSwitchStatus] = useState("");
  const [userStatusClass, setUserStatusClass] = useState("");
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(false);
  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
    setIsSwitchActive(!isSwitchActive);
  };
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    if (user) {
      const userStatus = user.status;
      if (userStatus) {
        setUserStatusClass(userStatus);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setLogoutModal(false);
    }
  }, [user]);

  function closeOverlay(event) {
    if (isLoggedIn) {
      const popup = document.getElementById("profile-popup") ?? "";
      if (popup) {
        const isPopupOpen = popup.classList.contains("show") ?? "";
        if (
          isPopupOpen &&
          event.target !== popup &&
          !popup.contains(event.target)
        ) {
          setIsInfoVisible(false);
          popup.classList.remove("show");
        }
      }
    }
  }
  if (isLoggedIn) {
    document.addEventListener("click", closeOverlay);
  }

  const handleStatusChange = async (status) => {
    if (status !== userStatusClass) {
      try {
        const authToken = new AuthServices();
        const csrfData = await authToken.fetchCSRFToken();
        //const checkAuth = await authToken.checkAuthTokenExpiration();
        const token = user.accessToken.token;
        if (csrfData.csrfToken) {
          axios.defaults.withCredentials = true;
          const userData = {
            id: user.id,
            email: user.email,
            status: user.status,
          };
          const response = await axios.patch(
            process.env.REACT_APP_API_URL +
              ":" +
              process.env.REACT_APP_API_PORT +
              "/api/users/",
            {
              where: "status-update",
              id: userData.id,
              status: status,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfData.csrfToken,
                Authorization: "Bearer " + token,
              },
              credentials: "include",
              mode: "cors",
            }
          );
          if (response.data.success) {
            let updatedFields = ["status"];
            let updatedValues = [status];
            if (status === "invisible") {
              updatedFields.push("last_seen");
              updatedValues.push(new Date());
            }
            updateUser(updatedFields, updatedValues);
            setSwitchStatus(false);
            setUserStatusClass(status);
            setIsInfoVisible(false);
            setIsSwitchActive(false);
          } else {
            console.log(response);
          }
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const toggleStatusSwitch = () => {
    if (switchStatus === true) {
      setSwitchStatus(false);
    } else {
      setSwitchStatus(true);
    }
  };

  const toggleSidebar = () => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");

    if (isLoggedIn) {
      const popup = document.getElementById("profile-popup");
      popup.classList.remove("show");
      setIsInfoVisible(false);
      setItemSearch(false);
    }
    sidebar.classList.toggle("open");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  };
  function handleProfileClick(event) {
    const popup = document.getElementById("profile-popup"),
      sidebar = document.getElementById("sidebar");
    if (sidebar.classList.contains("open")) {
      setIsInfoVisible(false);
      popup.classList.toggle("show");
    }
    event.stopPropagation();
  }

  const logoutOpen = () => {
    setLogoutModal(true);
  };

  const logoutClose = () => {
    setLogoutModal(false);
  };

  const [itemSearch, setItemSearch] = useState(false);
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [searchItemsFound, setSearchItemsFound] = useState([]);
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem("language");
    setLanguageUser(languageFromLocalStorage);
  }, [localStorage.getItem("language")]);

  const delayedHandleItemSearch = debounce(async (event) => {
    const language = languageSupport(languageUser);
    if (!language) {
      setLanguageUser("en");
    }
    const value = event.target.value;
    if (value !== "") {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/item/${value}/${languageUser}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
            mode: "cors",
          }
        );
        if (response.status === 200) {
          if (Array.isArray(response.data) && response.data.length === 0) {
            setItemSearch(false);
          } else {
            setSearchItemsFound(response.data);
            setItemSearch(true);
          }
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    } else {
      setItemSearch(false);
    }
  }, 500);
  const handleItemSearch = (event) => {
    delayedHandleItemSearch(event);
  };

  const handleClearInput = () => {
    document.getElementById("itemSearch").value = "";
    setItemSearch(false);
  };

  const handleSearchValue = (item) => {
    document.getElementById("itemSearch").value = item.name[languageUser];
  };

  return {
    isLoggedIn,
    switchStatus,
    userStatusClass,
    isInfoVisible,
    isSwitchActive,
    toggleInfoVisibility,
    handleStatusChange,
    user,
    toggleStatusSwitch,
    toggleSidebar,
    handleProfileClick,
    logoutModal,
    setLogoutModal,
    handleItemSearch,
    itemSearch,
    searchItemsFound,
    handleClearInput,
    handleSearchValue,
    t,
    logoutClose,
    auth,
    languageUser,
    logoutOpen,
    logout,
  };
};

export default useNavbar;
