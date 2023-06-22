const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/:name", userController.getUserByName);
router.put("/:name", userController.updateUserByName);
router.delete("/:name", userController.deleteUserByName);

module.exports = router;