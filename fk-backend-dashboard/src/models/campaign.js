"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { Generated_link } from "./GeneratedLink.js";

export const Campaign = sequelize.define(
  "campaign",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    platform: {
      type: DataTypes.STRING,
    },
    generated_link_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    modelName: "Campaign",
    tableName: "campaign",
    underscored: true,
    timestamps: true,
  }
);

Generated_link.hasOne(Campaign, {
  foreignKey: "generated_link_id",
});

Campaign.belongsTo(Generated_link);

Client.hasMany(Campaign, {
  foreignKey: "client_id",
});

Campaign.belongsTo(Client);
