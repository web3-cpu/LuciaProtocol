import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Founder = sequelize.define(
  "founder",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    signature: { 
      type: DataTypes.BLOB
    },
    common_shares: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);
