const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router.get("/get", orderController.getItemBySlug);
router.get("/user", orderController.getItemByUsername);
router.post("/post", authController.checkCsrfToken, authController.authenticate, orderController.createPost);
router.patch("/update", authController.checkCsrfToken, authController.authenticate, orderController.updateOrder);


module.exports = router;
