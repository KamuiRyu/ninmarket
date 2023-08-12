import { createContext, useState, useEffect } from "react";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const jsonParse = JSON.parse(storedUser);
      setUser(jsonParse);
    }
  }, []);
  const login = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(true);
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          photo: data.user.photo !== "undefined" ? data.user.photo : null,
          status: data.user.status,
          last_seen: data.user.lastSeen ?? "",
          reputation: data.user.reputation ?? "",
          accessToken: {
            token: data.user.accessToken.token,
            expirationToken: data.user.accessToken.expirationToken,
          },
        };
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        resolve(true);
      }, 1000);
    });
  };

  const updateUser = (keysOrUpdate, values) => {
    const isArrayFormat = Array.isArray(keysOrUpdate);
    const keys = isArrayFormat ? keysOrUpdate : [keysOrUpdate];
    const vals = isArrayFormat ? values : [values];

    setUser((prevUser) => ({
      ...prevUser,
      ...keys.reduce((acc, key, index) => {
        acc[key] = vals[index];
        return acc;
      }, {}),
    }));
    const jsonString = localStorage.getItem("userData");
    if (jsonString) {
      try {
        const jsonArray = JSON.parse(jsonString);
        const updatedUser = {
          ...jsonArray,
          ...keys.reduce((acc, key, index) => {
            acc[key] = vals[index];
            return acc;
          }, {}),
        };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Erro ao atualizar localStorage:", error);
      }
    }
  };

  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(true);
        setUser(null);
        localStorage.removeItem("userData");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        resolve(true);
      }, 1000);
    });
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, updateUser, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
