const express = require("express");
const router = express.Router();

const Worker_Middlware = require("../Middlewares/Worker_middleware");
const WorkerController = require("../Controllers/Worker_controller");

router.get(
    "/:userId/Profile",
    Worker_Middlware,
    WorkerController.Profile_controller.getProfile
);
router.put(
    "/:userId/Profile",
    Worker_Middlware,
    WorkerController.Profile_controller.EditeProfile
);
// _________________________________________________________________
router.get(
    "/:userId/Blogs",
    Worker_Middlware,
    WorkerController.Blogs_controller.get_All
);
router.get(
    "/:userId/Blogs/:blogId",
    Worker_Middlware,
    WorkerController.Blogs_controller.get_by_id
);
router.post(
    "/:userId/Blogs",
    Worker_Middlware,
    WorkerController.Blogs_controller.add_blog
);
router.put(
    "/:userId/Blogs/:blogId",
    Worker_Middlware,
    WorkerController.Blogs_controller.edit_blog
);
router.delete(
    "/:userId/Blogs/:blogId",
    Worker_Middlware,
    WorkerController.Blogs_controller.delete_blog
);
// _________________________________________________________________
router.get(
    "/:userId/Events",
    Worker_Middlware,
    WorkerController.Events_controller.get_All
);
router.get(
    "/:userId/Events/:eventId",
    Worker_Middlware,
    WorkerController.Events_controller.get_by_id
);
router.post(
    "/:userId/Events",
    Worker_Middlware,
    WorkerController.Events_controller.add_event
);
router.put(
    "/:userId/Events/:eventId",
    Worker_Middlware,
    WorkerController.Events_controller.edit_event
);
router.delete(
    "/:userId/Events/:eventId",
    Worker_Middlware,
    WorkerController.Events_controller.delete_event
);


module.exports = router;
