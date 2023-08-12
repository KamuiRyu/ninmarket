import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../providers/userContext";
import BGProfile from "../../../../assets/images/BG_profile.jpg";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const useMyProfile = (userName) => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState("");
  const { t } = useTranslation();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [lastSeen, setLastSeen] = useState("");
  const BG = (user && user.background) ?? BGProfile;

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const userResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/users/get/${userName}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            params: {
              idUser: user && user.id ? user.id : "",
            },
            withCredentials: true,
            mode: "cors",
          }
        );

        if (userResponse.status === 200) {
          setUserData(userResponse.data);
          setLastSeen(formatTimeAgo(userResponse.data.user.last_seen, t));
        }
        setIsLoading(true);
      } catch (error) {
        console.error("Erro ao buscar o item ou os pedidos:", error);
        setIsLoading(true);
      }
    };
    const formatTimeAgo = (lastSeenTimestamp, t) => {
      const now = new Date();
      const lastSeen = new Date(lastSeenTimestamp);
      const timeDifference = now - lastSeen;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let translatedMessage = "";
      let pluralSuffix = "";

      if (days > 0) {
        translatedMessage = t("profile.lastSeenDaysAgo", { count: days });
        pluralSuffix = days > 1 ? "s" : "";
      } else if (hours > 0) {
        translatedMessage = t("profile.lastSeenHoursAgo", { count: hours });
        pluralSuffix = hours > 1 ? "s" : "";
      } else if (minutes > 0) {
        translatedMessage = t("profile.lastSeenMinutesAgo", { count: minutes });
        pluralSuffix = minutes > 1 ? "s" : "";
      } else {
        translatedMessage = t("profile.lastSeenSecondsAgo", { count: seconds });
        pluralSuffix = seconds !== 1 ? "s" : "";
      }

      return `${translatedMessage}${pluralSuffix} ${t("profile.lastSeenAgo")}`;
    };
    if (userName) {
      fetchData();
    }
  }, [userName, user]);
  const getCurrentTab = () => {
    const match = location.pathname.match(/\/profile\/[^/]+\/([^/]+)/);
    return match ? match[1] : "orders";
  };
  return {
    user,
    BG,
    getCurrentTab,
    t,
    userData,
    lastSeen,
  };
};

export default useMyProfile;
