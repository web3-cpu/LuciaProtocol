import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./User.js";

export const Fingerprint = sequelize.define("fingerprint", {
  jsonData: {
    type: DataTypes.JSONB,
    allowNull: false,
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
});

User.hasMany(Fingerprint, {
  foreignKey: "user_id",
});

Fingerprint.belongsTo(User);
