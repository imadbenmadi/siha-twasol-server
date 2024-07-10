const { getProfile } = require("./Malad/getProfile");
const { EditeProfile } = require("./Malad/EditeProfile");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Malad/Notifications");

const MaladController = {
    getProfile,
    EditeProfile,
    GetNotifications,
    DeleteNotification,
};

module.exports = MaladController;
