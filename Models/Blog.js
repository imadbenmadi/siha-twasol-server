const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const { Doctor } = require("./Doctor");
const { Worker } = require("./Worker");

const Blog = sequelize.define("Blog", {
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

// Associations
Blog.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Blog, { foreignKey: "companyId" });

Blog.belongsTo(Doctor, { foreignKey: "ownerId" });
Doctor.hasMany(Blog, { foreignKey: "ownerId" });

Blog.belongsTo(Worker, { foreignKey: "ownerId" });
Worker.hasMany(Blog, { foreignKey: "ownerId" });

module.exports = { Blog };
