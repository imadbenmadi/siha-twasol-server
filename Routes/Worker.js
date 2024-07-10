const express = require("express");
const router = express.Router();

const Worker_Middlware = require("../Middlewares/Worker_middleware");
const WorkerController = require("../Controllers/Worker_controller");

router.get("/:userId/Profile", Worker_Middlware, WorkerController.getProfile);

module.exports = router;