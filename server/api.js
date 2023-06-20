require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");

app.use(express.json());
app.use(cors());

// Rota de login sem autenticação
app.post("/api/login", authController.login);

// Rotas de usuários com autenticação
app.post("/api/users", authController.authenticate, userController.createUser);
app.get(
    "/api/users/:name",
    authController.authenticate,
    userController.getUserByName
);
app.put(
    "/api/users/:name",
    authController.authenticate,
    userController.updateUserByName
);
app.delete(
    "/api/users/:name",
    authController.authenticate,
    userController.deleteUserByName
);

// Inicie o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
