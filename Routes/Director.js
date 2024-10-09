const express = require("express");
const router = express.Router();

const Director_Middlware = require("../Middlewares/Director_midllware");
const DirectorController = require("../Controllers/Director_controller");

router.get(
    "/:userId/Profile",
    Director_Middlware,
    DirectorController.profile_controller.getProfile
);
// _____________________________
router.get(
    "/:userId/:companyId/Workers",
    Director_Middlware,
    DirectorController.worker_controller.get_All
);
router.get(
    "/:userId/:companyId/Workers/:workerId",
    Director_Middlware,
    DirectorController.worker_controller.get_by_id
);
router.put(
    "/:userId/:companyId/Workers/:workerId",
    Director_Middlware,
    DirectorController.worker_controller.edit_worker
);
router.delete(
    "/:userId/:companyId/Workers/:workerId",
    Director_Middlware,
    DirectorController.worker_controller.delet_worker
);
router.get(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.worker_controller.get_Services
);
router.post(
    "/:userId/:companyId/Workers",
    Director_Middlware,
    DirectorController.worker_controller.add_worker
);
// _____________________________
router.get(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.Services_controller.get_All
);
router.get(
    "/:userId/:companyId/Services/:serviceId",
    Director_Middlware,
    DirectorController.Services_controller.get_by_id
);
router.get(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.Services_controller.get_compayny_Services
);
router.put(
    "/:userId/:companyId/Services/:serviceId",
    Director_Middlware,
    DirectorController.Services_controller.edit_service
);
router.delete(
    "/:userId/:companyId/Services/:serviceId",
    Director_Middlware,
    DirectorController.Services_controller.delet_service
);
router.post(
    "/:userId/:companyId/Services",
    Director_Middlware,
    DirectorController.Services_controller.add_service
);

module.exports = router;
