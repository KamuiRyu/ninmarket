const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/", authController.authenticate, userController.createUser);
router.get("/:name", authController.authenticate, userController.getUserByName);
router.put(
    "/:name",
    authController.authenticate,
    userController.updateUserByName
);
router.delete(
    "/:name",
    authController.authenticate,
    userController.deleteUserByName
);

module.exports = router;
