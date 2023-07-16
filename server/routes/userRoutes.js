const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/", authController.checkCsrfToken, userController.createUser);
router.get("/:id", authController.checkCsrfToken, userController.getUserByName);
router.patch(
  "/",
  authController.authenticate,
  authController.checkCsrfToken,
  userController.updateUserById
);
router.delete(
  "/:id",
  authController.checkCsrfToken,
  userController.deleteUserByName
);

module.exports = router;
