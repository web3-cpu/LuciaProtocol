import { DataTypes } from "sequelize";
 import { sequelize } from "../db/database.js";
 import { Client } from "./Client.js";
 import { User } from "./User.js"
 import { Fingerprint } from "./Fingerprint.js";

export const Conversion_data = sequelize.define(
  "conversion_data",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER
    },
    event: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.DOUBLE
    },
    fingerprint_id:{
      type: DataTypes.INTEGER
    }
  },
  { 
    modelName: 'Conversion_data',
    tableName: 'conversion_data',
    underscored: true,
    timestamps: true,
  }
);



User.hasMany(Conversion_data, {
  foreignKey: "user_id"
});

Conversion_data.belongsTo(User);

Client.hasMany(Conversion_data, {
  foreignKey: "client_id",
});

Conversion_data.belongsTo(Client);

Fingerprint.hasMany(Conversion_data, {
  foreignKey: "fingerprint_id",
});

Conversion_data.belongsTo(Fingerprint);