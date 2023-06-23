export default class AuthToken {
  async fetchToken() {
    const url =
      process.env.REACT_APP_API_URL +
      ":" +
      process.env.REACT_APP_API_PORT +
      "/api/login";
    const data = {
      email: process.env.REACT_APP_LOGIN,
      password: process.env.REACT_APP_PASSWORD,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha na solicitação");
      }

      const tokenData = await response.json();
      localStorage.setItem("api_token", tokenData.token);
      localStorage.setItem("api_tokenExpirationTime", tokenData.expiresIn);

      return {
        success: true,
        token: tokenData.token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
  async checkTokenExpiration() {
    try {
      const storedToken = localStorage.getItem("api_token");
      const storedExpirationTime = localStorage.getItem(
        "api_tokenExpirationTime"
      );
      if (storedToken && storedExpirationTime) {
        const currentTime = Date.now();
        const timeRemaining = storedExpirationTime - currentTime;
        const thirtyMinutes = 20 * 60 * 1000;

        if (timeRemaining <= thirtyMinutes) {
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
  async checkRememberTokenExpiration() {
    const token = localStorage.getItem("user_remember_token");
    const tokenExpirationTime = localStorage.getItem(
      "user_rememberExpirationTime"
    );

    if (token && tokenExpirationTime) {
      const currentTime = Date.now();
      if (currentTime > parseInt(tokenExpirationTime)) {
        localStorage.removeItem("auth_login");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_ninja_name");
        localStorage.removeItem("user_rememberExpirationTime");
        localStorage.removeItem("user_remember_token");
      }
    }
  }
  async fetchCSRFToken(token) {
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
          Authorization: "Bearer " + token,
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
