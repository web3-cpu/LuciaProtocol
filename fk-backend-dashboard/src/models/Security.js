import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Safe } from "./Safe.js";

export const Security = sequelize.define(
  "security",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

Security.hasMany(Safe, {
  foreignKey: "security_id",
  sourceKey: "id",
});

Safe.belongsTo(Security, {
  foreignKey: "security_id",
  targetId: "id",
});
