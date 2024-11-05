const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

// Simple Doctor_Followers model
const Doctor_Followers = sequelize.define(
    "Doctor_Followers",
    {
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maladId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

module.exports = { Doctor_Followers };
