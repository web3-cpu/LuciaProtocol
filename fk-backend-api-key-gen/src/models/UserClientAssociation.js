import { DataTypes } from "sequelize";
 import { sequelize } from "../db/database.js";
 import { Client } from "./Client.js";
 import { User } from "./User.js"

export const User_client_association = sequelize.define(
  "user_client_association",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER
    },
    subscription_type: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    expiration: {
      type: DataTypes.DATE
    }
  },
  { 
    modelName: 'User_client_association',
    tableName: 'user_client_association',
    underscored: true,
    timestamps: true,
  }
);

User.hasMany(User_client_association, {
  foreignKey: "user_id"
});

User_client_association.belongsTo(User);

Client.hasMany(User_client_association, {
  foreignKey: "client_id",
});

User_client_association.belongsTo(Client);

