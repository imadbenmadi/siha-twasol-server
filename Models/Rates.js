const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Malad } = require("./Malad");
const { Medecin } = require("./Medecin");
const Malad_Rates = sequelize.define("Malad_Rates", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medicinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
const Medicin_Rates = sequelize.define("Medicin_Rates", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medicinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Malad.hasMany(Malad_Rates, { foreignKey: "maladId" });
Medecin.hasMany(Medicin_Rates, { foreignKey: "medicinId" });
module.exports = { Malad_Rates, Medicin_Rates };
