const profile_controller = require("./Director/Profile");
const worker_controller = require("./Director/Workers");
const Services_controller = require("./Director/Services");
const DirectorController = {
    profile_controller,
    worker_controller,
    Services_controller,
};

module.exports = DirectorController;
