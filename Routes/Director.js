const express = require("express");
const router = express.Router();

const Director_Middlware = require("../Middlewares/Director_midllware");
const DirectorController = require("../Controllers/Director_controller");

router.get("/:userId/Profile", Director_Middlware, DirectorController.getProfile);
module.exports = router;
