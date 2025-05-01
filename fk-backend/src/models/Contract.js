import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Security } from "./Security.js";

export const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: "",
    }
  },
  {
    timestamps: true,
  }
);

Contract.hasMany(Security, {
  foreignKey: "contract_id",
  sourceKey: "id",
});

Security.belongsTo(Contract, {
  foreignKey: "contract_id", // action item: need to learn how to rename this to contract_id
  targetId: "id",
});
