const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const { Medecin } = require("./Medecin");
const { Worker } = require("./Worker");
const Event = sequelize.define("Event", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ownerType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Event.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Event, { foreignKey: "companyId" });
Event.belongsTo(Medecin, { foreignKey: "ownerId" });
Medecin.hasMany(Event, { foreignKey: "ownerId" });
Event.belongsTo(Worker, { foreignKey: "ownerId" });
Worker.hasMany(Event, { foreignKey: "ownerId" });

module.exports = { Event };
