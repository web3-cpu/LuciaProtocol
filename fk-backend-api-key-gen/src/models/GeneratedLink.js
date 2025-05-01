"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";

export const Generated_link = sequelize.define(
  "generated_link",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    link: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alias: {
      type: DataTypes.BOOLEAN,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    num_clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    modelName: "Generated_link",
    tableName: "generated_link",
    underscored: true,
    timestamps: true,
  }
);

Client.hasMany(Generated_link, {
  foreignKey: "client_id",
});

Generated_link.belongsTo(Client);
