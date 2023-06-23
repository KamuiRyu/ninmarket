const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const csrf = require("csurf");


const csrfProtection = csrf({ cookie: true });

router.post("/login", authController.apiLogin);

router.post("/auth/login",csrfProtection,authController.userLogin);

module.exports = router;