const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/auth/login", authController.userLogin);

router.post("/auth/checkauthtoken", authController.checkAuthToken);

module.exports = router;
