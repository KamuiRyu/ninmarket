const jwt = require("jsonwebtoken");
require("dotenv").config({
  allowEmptyValues: true,
});
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { Op } = require("sequelize");
const moment = require("moment");
const cookie = require("cookie");

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      [Op.and]: [{ email }, { active: true }],
    },
  });

  if (user) {
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const rememberMe = req.body.rememberme;
        const expiresIn = rememberMe === true ? "7d" : "1d";
        const tokenExpirationTime =
          expiresIn === "7d" ? Date.now() + 604800000 : Date.now() + 86400000;

        const formattedDateTime = moment(tokenExpirationTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const token = await generateAuthToken(
          user,
          expiresIn,
          formattedDateTime,
          res
        );
        if (token) {
          if (user.photo_url !== null) {
            const urlPattern =
              /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{1,5})?([/?#]\S*)?$/i;
            if (!urlPattern.test(user.photo_url)) {
              user.photo_url = null;
            }
          } else {
            user.photo_url = null;
          }
          return res.json({
            auth_login: true,
            user: {
              email: user.email,
              name: user.name,
              photo: user.photo_url !== null ? user.photo_url : "",
              status: user.status ?? "invisible",
              expirationToken:
                token.expirationTime !== null
                  ? token.expirationTime
                  : user.token_expirationTime,
              role_id: user.role_id ?? 2,
              token: token.token !== null ? token.token : user.auth_token,
            },
          });
        }
      } else {
        return res.json({
          login: false,
          error:
            "The email address or password was incorrect. Please try again",
          errorTag: "invalid-login",
        });
      }
    } catch (error) {
      return res.json({
        login: false,
        error: "Falha ao realizar a solicitação",
        errorTag: "invalid-request",
      });
    }
  } else {
    return res.json({
      login: false,
      error: "The email address or password was incorrect. Please try again",
      errorTag: "invalid-login",
    });
  }
}
const generateAuthToken = async (user, expiresIn, tokenExpirationTime, res) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  try {
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn });
    const [numUpdated, updatedUsers] = await User.update(
      { auth_token: token, token_expirationTime: tokenExpirationTime },
      { where: { id: user.id }, returning: true }
    );
    if (numUpdated > 0 && updatedUsers.length > 0) {
      return {
        token: token,
        expirationTime: tokenExpirationTime,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

function decodedToken(token) {
  const secret_key = process.env.SECRET;
  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), secret_key);
    return decodedToken;
  } catch (error) {
    console.error("Erro na verificação do token:", error.message);
  }
}

async function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }
  const secret_key = process.env.SECRET;
  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), secret_key);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

function checkCsrfToken(req, res, next) {
  const csrfToken = req.cookies._csrf;
  const sessionCsrfToken = req.session._csrf;
  if (!csrfToken || csrfToken !== sessionCsrfToken) {
    return res.status(403).json({ error: "Token CSRF inválido" });
  }
  delete req.session._csrf;
  res.clearCookie("_csrf");
  next();
}
async function checkAuthToken(req, res, next) {
  const email = req.body.email;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    const checkToken = await checkAuthTokenFn(user);
    if (checkToken.auth_token) {
      if (checkToken) {
        return res.json({
          auth_token: true,
          newExpirationTime: checkToken.expirationTime,
        });
      }
    } else {
      return res.json({
        auth_token: false,
        error: "token-expired",
        message: "Token expired",
      });
    }
  } else {
    return {
      auth_login: false,
      error: "user-notAuth",
    };
  }
}

async function checkAuthTokenFn(user) {
  const tokenExpirationTime = user.token_expirationTime;
  const renewalInterval = process.env.REACT_APP_TOKEN_RENOVATION_TIME;
  const currentDateTime = moment();
  const expirationDateTime = moment(tokenExpirationTime);
  const timeDifference = expirationDateTime.diff(currentDateTime);
  const hoursDifference = moment.duration(timeDifference).asHours();
  if (hoursDifference <= renewalInterval && hoursDifference > 0) {
    const tokenExpirationTime = moment()
      .add(1, "day")
      .format("YYYY-MM-DD HH:mm:ss");
    const token = await generateAuthToken(user, "1d", tokenExpirationTime);
    if (token) {
      return {
        auth_token: true,
        token: token.token,
        expirationTime: token.expirationTime,
      };
    }
  } else if (timeDifference <= 0) {
    return {
      auth_token: true,
      error: "token-expired",
      message: "Token expired",
    };
  } else {
    return {
      auth_token: true,
      token: user.auth_token,
    };
  }
}

module.exports = {
  authenticate,
  userLogin,
  decodedToken,
  checkCsrfToken,
  checkAuthToken,
};
