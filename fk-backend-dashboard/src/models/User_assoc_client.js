import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { User } from "./User.js";

export const User_association_client = sequelize.define(
  "user_association_client",
  {
    client_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Client,
      //   key: "id",
      // },
    },
    user_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
      //   key: "id",
      // },
    },
  },
  {
    modelName: "User_association_client",
    tableName: "user_association_client",
    underscored: true,
    timestamps: true,
  }
);

// Client.belongsToMany(User, {
//   through: User_association_client,
//   foreignKey: "client_id",
// });
// User.belongsToMany(Client, {
//   through: User_association_client,
//   foreignKey: "user_id",
// });

User_association_client.associate = (models) => {};
