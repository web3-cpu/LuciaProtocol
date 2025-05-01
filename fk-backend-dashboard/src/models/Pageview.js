import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { User } from "./User.js";
import { Fingerprint } from "./Fingerprint.js";
import { Lucia_user } from "./LuciaUser.js";

export const Page_view = sequelize.define(
  "page_view",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    page: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    timestamp: {
      type: DataTypes.TIME,
    },
    lucia_user_id: {
      type: DataTypes.INTEGER,
    },
    fingerprint_id: {
      type: DataTypes.INTEGER,
    },
    session_id: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "Page_view",
    tableName: "page_view",
    underscored: true,
    timestamps: true,
  }
);

User.hasMany(Page_view, {
  foreignKey: "user_id",
});

Page_view.belongsTo(User);

Client.hasMany(Page_view, {
  foreignKey: "client_id",
});

Page_view.belongsTo(Client);

Lucia_user.hasMany(Page_view, {
  foreignKey: "lucia_user_id",
});

Page_view.belongsTo(Lucia_user);

Fingerprint.hasMany(Page_view, {
  foreignKey: "fingerprint_id",
});

Page_view.belongsTo(Fingerprint);
