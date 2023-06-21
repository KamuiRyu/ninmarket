const jwt = require("jsonwebtoken");
require("dotenv-safe").config();
const bcrypt = require("bcrypt");

function login(req, res) {
    const { email, password } = req.body;

    if (email === "api@ninmarket.com" || email === "admin@ninmarket.com") {
        // Suponha que você tenha a senha armazenada no banco de dados (hash)
        let id;
        if (email === "api@ninmarket.com") {
            id = 1;
        } else {
            id = 2;
        }
        const storedPasswordHash =
            "$2b$10$$2b$10$4Sm65YF4bSRe2BojIK7FHe6JnGJxK7dP1Hj9MfVURAfqTopuGCDq2";

        const validPassword = bcrypt.compare(password, storedPasswordHash);
        if (validPassword) {
            const token = generateToken({ id: id, email: email });
            const tokenExpirationTime = Date.now() + 3600000;
            return res.json({
                success: true,
                token: token,
                expiresIn: tokenExpirationTime,
            });
        } else {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
    } else {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }
}

function generateToken(payload) {
    const options = {
        expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.SECRET, options);
}

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            auth: false,
            error: "Token de autenticação não fornecido",
        });
    }
    jwt.verify(
        token.replace("Bearer ", ""),
        process.env.SECRET,
        function (err, decoded) {
            if (err)
                return res.status(500).json({
                    auth: false,
                    message: "Failed to authenticate token.",
                });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        }
    );
}

module.exports = {
    login,
    authenticate,
};
