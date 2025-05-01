import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { User } from "./User.js";
import { Fingerprint } from "./Fingerprint.js";
import { Lucia_user } from "./LuciaUser.js";

export const Redirect = sequelize.define(
  "redirect",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    redirect_hash: {
      type: DataTypes.STRING,
    },
    lucia_user_id: {
      type: DataTypes.INTEGER,
    },
    fingerprint_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "Redirect",
    tableName: "redirect",
    underscored: true,
    timestamps: true,
  }
);

Client.hasMany(Redirect, {
  foreignKey: "client_id",
});

Redirect.belongsTo(Client);

Lucia_user.hasMany(Redirect, {
  foreignKey: "lucia_user_id",
});

Redirect.belongsTo(Lucia_user);

Fingerprint.hasMany(Redirect, {
  foreignKey: "fingerprint_id",
});

Redirect.belongsTo(Fingerprint);
