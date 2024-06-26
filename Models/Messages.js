const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Malad } = require("./Malad");
const { Medecin } = require("./Medecin");
const Message = sequelize.define("Message", {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senderType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    receiverType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
Malad.hasMany(Message, { foreignKey: "senderId" });
Medecin.hasMany(Message, { foreignKey: "senderId" });
Message.belongsTo(Malad, { foreignKey: "senderId" });
Message.belongsTo(Medecin, { foreignKey: "senderId" });

Malad.hasMany(Message, { foreignKey: "receiverId" });
Medecin.hasMany(Message, { foreignKey: "receiverId" });
Message.belongsTo(Malad, { foreignKey: "receiverId" });
Message.belongsTo(Medecin, { foreignKey: "receiverId" });


module.exports = { Message };
