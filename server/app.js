require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
 
const apiUrl = "http://localhost";
const apiPort = 3000;


// Rotas

app.use("/api/", authRoutes);
app.use("/api/users", userRoutes);

// Inicie o servidor
app.listen(apiPort, () => {
  console.log(`Acesse o servidor em: ${apiUrl}:${apiPort}/`);
});
