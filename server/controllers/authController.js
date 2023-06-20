const jwt = require("jsonwebtoken");
require("dotenv-safe").config();

function login(req, res) {
    const { email, password } = req.body;
    if (email === "admin@ninmarket.com" && password === "Senha@2023") {
        const token = generateToken({ id: 1, email: email });
        const tokenExpirationTime = Date.now() + 3600000;
        return res.json({
            auth: true,
            token: token,
            expiresIn: tokenExpirationTime,
        });
    }
    return res.status(401).json({ error: "Credenciais inválidas" });
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
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return res.status(500).json({
                auth: false,
                message: "Failed to authenticate token.",
            });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    login,
    authenticate,
};
