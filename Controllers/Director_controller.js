const profile_controller = require("./Director/Profile");
const worker_controller = require("./Director/Workers");
const Services_controller = require("./Director/Services");
const Doctores_controller = require("./Director/Doctores");
const Blogs_controller = require("./Director/Blogs");
const Events_controller = require("./Director/Events");
const DirectorController = {
    profile_controller,
    worker_controller,
    Services_controller,
    Doctores_controller,
    Blogs_controller,
    Events_controller,
};

module.exports = DirectorController;
