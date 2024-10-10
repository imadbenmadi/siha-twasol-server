const profile_controller = require("./Director/Profile");
const worker_controller = require("./Director/Workers");
const Services_controller = require("./Director/Services");
const Doctores_controller = require("./Director/Doctores");
const DirectorController = {
    profile_controller,
    worker_controller,
    Services_controller,
    Doctores_controller,
};

module.exports = DirectorController;
