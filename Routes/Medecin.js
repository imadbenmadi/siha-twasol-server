const express = require("express");
const router = express.Router();

const Medecin_Middlware = require("../Middlewares/Medecin_middleware");
const MedecinController = require("../Controllers/Medecin_controller");

router.get("/:userId/Profile", Medecin_Middlware, MedecinController.getProfile);
module.exports = router;
