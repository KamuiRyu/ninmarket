const jwt = require("jsonwebtoken");
require("dotenv").config({
  allowEmptyValues: true,
});
const bcrypt = require("bcrypt");
const User = require("../models/user");

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const rememberMe = req.body.rememberMe === true;
        
        const expiresIn = rememberMe ? "1d" : "1h";
        const token = await generateAuthToken(user, expiresIn);
        const tokenExpirationTime = (expiresIn === '1d') ? Date.now() + 86400000 : Date.now() + 3600000;

        await User.update(
          { remember_token: token },
          { where: { id: user.id } }
        );
        return res.json({
          remember_token: {
            token: token,
            expireTime: tokenExpirationTime,
          },
          user: {
            id: user.id,
            ninja_name: user.ninja_name, 
            email: user.email,
          },
        });
        
        
      } else {
        return res
          .json({ login: false, error: "The email address or password was incorrect. Please try again", errorTag: "invalid-login" });
      }
    } catch (error) {
      return res.json({
        login: false,
        error: "Falha ao realizar a solicitação",
        errorTag: "invalid-request",
      });
    }
  } else {
    return res
      .json({ login: false, error: "The email address or password was incorrect. Please try again", errorTag: "invalid-login" });
  }
}
async function apiLogin(req, res) {
  const { email, password } = req.body;

  if (email === "api@ninmarket.com" || email === "admin@ninmarket.com") {
    try {
      const user = await User.findOne({ where: { email } });

      const id = user ? user.id : null;
      const userPassword = user ? user.password : null;

      if (id !== null) {
        const validPassword = await bcrypt.compare(password, userPassword);
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
      }
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Erro ao buscar usuário: " + error });
    }
  } else {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
}
const generateAuthToken = (user, expiresIn) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn });
  return token;
};
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
  apiLogin,
  authenticate,
  userLogin,
};
