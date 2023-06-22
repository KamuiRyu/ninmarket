export default class AuthToken {
    async fetchToken() {
        const url = process.env.REACT_APP_API_URL+":"+process.env.REACT_APP_API_PORT+"/api/login";
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
            localStorage.setItem("token", tokenData.token);
            localStorage.setItem("tokenExpirationTime", tokenData.expiresIn);

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
            const storedToken = localStorage.getItem("token");
            const storedExpirationTime = localStorage.getItem(
                "tokenExpirationTime"
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
    async fetchCSRFToken(token) {
        const url = process.env.REACT_APP_API_URL+":"+process.env.REACT_APP_API_PORT+"/api/csrftoken"; 
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: "Bearer "+token
                },
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
      };
}
