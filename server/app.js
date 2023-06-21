require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());

// Rotas

app.use("/api/", authRoutes);
app.use("/api/users", userRoutes);

// Inicie o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
