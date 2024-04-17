import { Sequelize, DataTypes } from "sequelize";

import databasePath from "../utils/databasePath";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: databasePath
});

export const User = sequelize.define(
    "User",
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
    }
);

// sequelize.sync({ alter: true });