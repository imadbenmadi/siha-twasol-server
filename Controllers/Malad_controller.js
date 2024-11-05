const profile_controller = require("./Malad/Profile");
const Company_controller = require("./Malad/Companies");
const Blog_controller = require("./Malad/Blogs");
const Event_controller = require("./Malad/Events");
const Follow_controller = require("./Malad/Follow");

const MaladController = {
    profile_controller,
    Company_controller,
    Blog_controller,
    Event_controller,
    Follow_controller
};
module.exports = MaladController;
