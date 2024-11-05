const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Malad } = require("./Malad");
const { Doctor } = require("./Doctor");
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
Doctor.hasMany(Medicin_Rates, { foreignKey: "medicinId" });
Malad.hasMany(Medicin_Rates, { foreignKey: "maladId" });
Doctor.hasMany(Malad_Rates, { foreignKey: "medicinId" });

Malad_Rates.belongsTo(Malad, { foreignKey: "maladId" });
Malad_Rates.belongsTo(Doctor, { foreignKey: "medicinId" });
Medicin_Rates.belongsTo(Malad, { foreignKey: "maladId" });
Medicin_Rates.belongsTo(Doctor, { foreignKey: "medicinId" });

module.exports = { Malad_Rates, Medicin_Rates };
