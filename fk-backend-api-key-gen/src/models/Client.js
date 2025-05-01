import { DataTypes } from "sequelize";
 import { sequelize } from "../db/database.js";


export const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING
    },
    call_count: {
      type: DataTypes.INTEGER
    },
    expiration: {
      type: DataTypes.DATE
    },
    privilages: {
      type: DataTypes.INTEGER
    }

  },
  { 
    modelName: 'Client',
    tableName: 'client',
    underscored: true,
    timestamps: true,
  }
);


