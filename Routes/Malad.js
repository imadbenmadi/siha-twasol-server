const express = require("express");
const router = express.Router();

const Malad_Middlware = require("../Middlewares/Malad_middleware");
const MaladController = require("../Controllers/Malad_controller");

router.get(
    "/:userId/Profile",
    Malad_Middlware,
    MaladController.profile_controller.getProfile
);
router.get(
    "/:userId/Companies",
    Malad_Middlware,
    MaladController.Company_controller.get_All
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
    Malad_Middlware,
    MaladController.profile_controller.EditeProfile
);
module.exports = router;
