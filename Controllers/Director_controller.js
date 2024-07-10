const profile_controller = require("./Director/Profile");
const worker_controller = require("./Director/Workers");

const DirectorController = {
    profile_controller,
    worker_controller,
};

module.exports = DirectorController;
