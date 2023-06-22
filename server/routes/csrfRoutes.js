const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const authController = require("../controllers/authController");    


router.get("/",authController.authenticate, csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
