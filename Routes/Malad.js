const express = require("express");
const router = express.Router();

const Malad_Middlware = require("../Middlewares/Malad_middleware");
const MaladController = require("../Controllers/Malad_controller");

router.get("/:userId/Profile", Malad_Middlware, MaladController.getProfile);
