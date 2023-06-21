export default class AuthToken {
    async fetchToken() {
        const url = "http://localhost:3000/api/login";
        const data = {
            email: "api@ninmarket.com",
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
            console.log(error);
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
                const thirtyMinutes = 40 * 60 * 1000;

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
}
