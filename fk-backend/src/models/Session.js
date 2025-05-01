import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Session = sequelize.define(
  "session",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visit_counter: {
      type: DataTypes.INTEGER,
    },
    lucia_user_hash_value: {
      type: DataTypes.STRING,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    expiry: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "Session",
    tableName: "session",
    underscored: true,
    timestamps: true,
  }
);
