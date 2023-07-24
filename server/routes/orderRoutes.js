const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");


router.get("/get", orderController.getItemBySlug);
router.post("/post", authController.checkCsrfToken, authController.authenticate, orderController.createPost);


module.exports = router;
