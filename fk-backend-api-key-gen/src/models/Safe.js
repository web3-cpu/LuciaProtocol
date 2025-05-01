import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Safe = sequelize.define(
  "safe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    valuation_cap: {
      type: DataTypes.INTEGER
    },
    valuation_cap_denom: {
      type: DataTypes.STRING,
      defaultValue: "USD"
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0 //percentage points
    },
    principal_investment: {
      type: DataTypes.INTEGER,
      defaultValue: 10 // amount in dollars
    }

  },
  {
    timestamps: true,
  }
);


