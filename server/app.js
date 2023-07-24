require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const corsGate = require("cors-gate");
const session = require("express-session");

app.use(express.json());
app.use(corsGate.originFallbackToReferrer());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const csrfProtection = csrf({
  cookie: true,
  ignoreMethods: ["GET"], // Ignorar verificação CSRF para requisições GET
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000/"],
    credentials: true,
  })
);


const apiUrl = process.env.REACT_APP_API_URL;
const apiPort = process.env.REACT_APP_API_PORT;

// Rotas

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.get("/api/csrftoken", csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  req.session._csrf = csrfToken;
  res.cookie("_csrf", csrfToken, { httpOnly: true, maxAge: 60000 });
  res.json({ csrfToken });
});

app.use("/api", authRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);

// Inicie o servidor
app.listen(apiPort, () => {
  console.log(`Acesse o servidor em: ${apiUrl}:${apiPort}/`);
});
