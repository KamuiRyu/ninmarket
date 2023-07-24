const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authController = require("../controllers/authController");


router.get("/get/:slug", itemController.getItemBySlug);
router.get("/:term/:language", itemController.autoComplete);


module.exports = router;
