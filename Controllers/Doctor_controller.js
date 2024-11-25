const profile_controller = require("./Doctor/Profile");
const Blogs_controller = require("./Doctor/Blogs");
const Events_controller = require("./Doctor/Events");
const MaladsController = require("./Doctor/Malads");
const MaladController = {
    profile_controller,
    Blogs_controller,
    Events_controller,
    MaladsController,
};

module.exports = MaladController;
