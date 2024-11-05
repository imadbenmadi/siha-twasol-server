const express = require("express");
const router = express.Router();

const Doctor_Middlware = require("../Middlewares/Doctor_middleware");
const DoctorController = require("../Controllers/Doctor_controller");

router.get("/:userId/Profile", Doctor_Middlware, DoctorController.getProfile);
module.exports = router;
