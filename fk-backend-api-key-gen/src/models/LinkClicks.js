import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { User } from "./User.js";
import { Fingerprint } from "./Fingerprint.js";
import { Generated_link } from "./GeneratedLink.js";

export const Link_clicks = sequelize.define(
  "link_clicks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    link_id: {
      type: DataTypes.INTEGER,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    timestamp: {
      type: DataTypes.TIME,
    },
    fingerprint_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "Link_clicks",
    tableName: "link_clicks",
    underscored: true,
    timestamps: true,
  }
);

Fingerprint.hasMany(Link_clicks, {
  foreignKey: "fingerprint_id",
});

Link_clicks.belongsTo(Fingerprint);

Generated_link.hasMany(Link_clicks, {
  foreignKey: "link_id",
});

Link_clicks.belongsTo(Generated_link);

Client.hasMany(Link_clicks, {
  foreignKey: "client_id",
});

Link_clicks.belongsTo(Client);
