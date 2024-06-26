const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const { Service } = require("./Company");
const Malad = sequelize.define("Malad", {
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

    profile_pic_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
const Followings = sequelize.define("Following", {
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Malad.hasMany(Followings, { foreignKey: "patientId" });

module.exports = { Malad, Followings };
