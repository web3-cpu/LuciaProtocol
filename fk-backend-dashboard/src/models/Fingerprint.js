import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./User.js";
import { Lucia_user } from "./LuciaUser.js";

export const Fingerprint = sequelize.define(
  "fingerprint",
  {
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    agent: {
      type: DataTypes.STRING,
    },
    screen_width: {
      type: DataTypes.STRING,
    },
    screen_height: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    profileHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
    },
    lucia_user_id: {
      type: DataTypes.INTEGER,
    },
    unique_hash: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    location_info: {
      type: DataTypes.JSONB,
    },
    session_id: {
      type: DataTypes.STRING,
    },
  },
  {
    uniqueKeys: {
      actions_unique: {
        fields: ["profileHash", "user_id", "ip"],
      },
    },
  }
);

User.hasMany(Fingerprint, {
  foreignKey: "user_id",
});

Fingerprint.belongsTo(User);

Lucia_user.hasMany(Fingerprint, {
  foreignKey: "lucia_user_id",
});

Fingerprint.belongsTo(Lucia_user);
