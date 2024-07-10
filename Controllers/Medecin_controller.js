const { getProfile } = require("./Medecin/getProfile");
const { EditeProfile } = require("./Medecin/EditeProfile");
const {
    GetNotifications,
    DeleteNotification,
} = require("./Medecin/Notifications");

const MaladController = {
    getProfile,
    EditeProfile,
    GetNotifications,
    DeleteNotification,
};

module.exports = MaladController;
