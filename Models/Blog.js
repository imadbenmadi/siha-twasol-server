const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
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
        type: DataTypes.ENUM("Modir", "Medicin"),
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Blog.belongsTo(Company, { foreignKey: "companyId" });
module.exports = { Blog };
