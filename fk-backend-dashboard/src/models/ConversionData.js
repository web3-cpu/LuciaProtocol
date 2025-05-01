import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { User } from "./User.js";
import { Fingerprint } from "./Fingerprint.js";
import { Lucia_user } from "./LuciaUser.js";

export const Conversion_data = sequelize.define(
  "conversion_data",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    event_tag: {
      type: DataTypes.STRING,
    },
    event_details: {
      type: DataTypes.JSONB,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    user_id: {
      type: DataTypes.INTEGER,
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
    modelName: "Conversion_data",
    tableName: "conversion_data",
    underscored: true,
    timestamps: true,
  }
);

User.hasMany(Conversion_data, {
  foreignKey: "user_id",
});

Conversion_data.belongsTo(User);

Client.hasMany(Conversion_data, {
  foreignKey: "client_id",
});

Conversion_data.belongsTo(Client);

Lucia_user.hasMany(Conversion_data, {
  foreignKey: "lucia_user_id",
});

Conversion_data.belongsTo(Lucia_user);

Fingerprint.hasMany(Conversion_data, {
  foreignKey: "fingerprint_id",
});

Conversion_data.belongsTo(Fingerprint);
