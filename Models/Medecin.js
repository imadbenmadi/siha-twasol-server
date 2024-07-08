const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const { Service } = require("./Company");
const Medecin = sequelize.define("Medecin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Medecin_Malads = sequelize.define("Medecin_Malads", {
    maladId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medecinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Medecin.hasMany(Medecin_Malads, { foreignKey: "medecinId" });
Medecin_Malads.belongsTo(Medecin, { foreignKey: "medecinId" });

Company.hasMany(Medecin, { foreignKey: "companyId", as: "Medecins" });
Medecin.belongsTo(Company, { foreignKey: "companyId" });

Service.hasMany(Medecin, { foreignKey: "serviceId", as: "Medecins" });
Medecin.belongsTo(Service, { foreignKey: "serviceId" });
module.exports = { Medecin };
