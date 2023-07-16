import axios from "axios";

export default class AuthServices {
  async checkTokenExpiration() {
    try {
      const storedToken = localStorage.getItem("auth_token");
      const storedExpirationTime = localStorage.getItem(
        "auth_token_rememberExpirationTime"
      );
      if (storedToken && storedExpirationTime) {
        const currentTime = Date.now();
        const timeRemaining = storedExpirationTime - currentTime;

        if (timeRemaining <= 0) {
          const tokenData = await this.fetchToken();
          return tokenData;
        } else {
          return {
            success: true,
            token: storedToken,
          };
        }
      } else {
        const tokenData = await this.fetchToken();
        return tokenData;
      }
    } catch (error) {
      return error;
    }
  }
  async checkAuthTokenExpiration() {
    const email = localStorage.getItem("auth_email");
    try {
      axios.defaults.withCredentials = true;
      const userData = {
        email: email,
      };
      if (userData) {
        const response = await axios.post(
          process.env.REACT_APP_API_URL +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/auth/checkauthtoken",
          {
            email: userData.email,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
          }
        );
        if (response.data.auth_token) {
          if (response.data.expirationTime) {
            localStorage.setItem(
              "auth_expirationToken",
              response.data.expirationTime
            );
            return {
              auth_token: true,
              expirationTime: response.data.newExpirationTime,
            };
          } else {
            return {
              auth_token: true,
            };
          }
        } else {
          this.logoutUser();
          return {
            auth_token: false,
            error: response.data.error,
            message: response.data.message,
          };
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  async logoutUser(type = "") {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("auth_")) {
        localStorage.removeItem(key);
      }
    });
    if (type === "action-user") {
      window.location.reload();
    }
  }
  async fetchCSRFToken() {
    const url =
      process.env.REACT_APP_API_URL +
      ":" +
      process.env.REACT_APP_API_PORT +
      "/api/csrftoken";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Tyoe": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Falha na solicitação");
      }
      const csrfToken = await response.json();
      return {
        success: true,
        csrfToken: csrfToken.csrfToken,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
