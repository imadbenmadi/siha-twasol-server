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
// _____________________________
router.get(
    "/:userId/:companyId/Doctores",
    Director_Middlware,
    DirectorController.Doctores_controller.get_All
);
router.get(
    "/:userId/:companyId/Doctores/:doctorId",
    Director_Middlware,
    DirectorController.Doctores_controller.get_by_id
);
router.put(
    "/:userId/:companyId/Doctores/:doctorId",
    Director_Middlware,
    DirectorController.Doctores_controller.edit_doctore
);
router.delete(
    "/:userId/:companyId/Doctores/:doctorId",
    Director_Middlware,
    DirectorController.Doctores_controller.delet_doctore
);

router.post(
    "/:userId/:companyId/Doctores",
    Director_Middlware,
    DirectorController.Doctores_controller.add_doctore
);
// _____________________________
router.get(
    "/:userId/:companyId/Blogs",
    Director_Middlware,
    DirectorController.Blogs_controller.get_All
);
router.get(
    "/:userId/:companyId/Blogs/:doctorId",
    Director_Middlware,
    DirectorController.Blogs_controller.get_by_id
);
router.put(
    "/:userId/:companyId/Blogs/:doctorId",
    Director_Middlware,
    DirectorController.Blogs_controller.edit_doctore
);
router.delete(
    "/:userId/:companyId/Blogs/:doctorId",
    Director_Middlware,
    DirectorController.Blogs_controller.delet_doctore
);

router.post(
    "/:userId/:companyId/Blogs",
    Director_Middlware,
    DirectorController.Blogs_controller.add_doctore
);
// _____________________________
router.get(
    "/:userId/:companyId/Events",
    Director_Middlware,
    DirectorController.Events_controller.get_All
);
router.get(
    "/:userId/:companyId/Events/:doctorId",
    Director_Middlware,
    DirectorController.Events_controller.get_by_id
);
router.put(
    "/:userId/:companyId/Events/:doctorId",
    Director_Middlware,
    DirectorController.Events_controller.edit_doctore
);
router.delete(
    "/:userId/:companyId/Events/:doctorId",
    Director_Middlware,
    DirectorController.Events_controller.delet_doctore
);

router.post(
    "/:userId/:companyId/Events",
    Director_Middlware,
    DirectorController.Events_controller.add_doctore
);

module.exports = router;
