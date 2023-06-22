require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
  })
);
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

const apiUrl = process.env.REACT_APP_API_URL;
const apiPort = process.env.REACT_APP_API_PORT;

// Rotas

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const csrfRoutes = require("./routes/csrfRoutes");

app.use("/api", authRoutes);
app.use("/api/csrftoken", csrfRoutes);
app.use("/api/users", csrfProtection, userRoutes);

// Inicie o servidor
app.listen(apiPort, () => {
  console.log(`Acesse o servidor em: ${apiUrl}:${apiPort}/`);
});
