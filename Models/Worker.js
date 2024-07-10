const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const { Company } = require("./Company");
const Worker = sequelize.define("Worker", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
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
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

Company.hasMany(Worker, { foreignKey: "companyId", as: "Workers" });
Worker.belongsTo(Company, { foreignKey: "companyId" });

module.exports = { Worker };
