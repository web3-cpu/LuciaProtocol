import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";

export const ApiKey = sequelize.define(
  "apikey",
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    expiration: {
      type: DataTypes.TIME,
    },
  },
  {
    modelName: "ApiKey",
    tableName: "apikey",
    underscored: true,
    timestamps: true,
  }
);

Client.hasOne(ApiKey, {
  foreignKey: "client_id",
});

ApiKey.belongsTo(Client);
