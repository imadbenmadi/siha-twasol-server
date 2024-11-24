const express = require("express");
const router = express.Router();

const Doctor_Middlware = require("../Middlewares/Doctor_middleware");
const DoctorController = require("../Controllers/Doctor_controller");

router.get(
    "/:userId/Profile",
    Doctor_Middlware,
    DoctorController.profile_controller.getProfile
);

// _____________________________
// Formidable images
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());
router.put(
    "/:userId/Profile",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Doctor_Middlware,
    DoctorController.profile_controller.EditeProfile
);
module.exports = router;
