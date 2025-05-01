import { DataTypes } from "sequelize";
 import { sequelize } from "../db/database.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING
    }
  },
  { 
    modelName: 'User',
    tableName: 'user',
    underscored: true,
    timestamps: true,
  }
);
