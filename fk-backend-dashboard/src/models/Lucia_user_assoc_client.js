import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { Lucia_user } from "./LuciaUser.js";

export const Lucia_user_association_client = sequelize.define(
  "lucia_user_association_client",
  {
    client_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Client,
      //   key: "id",
      // },
    },
    lucia_user_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Lucia_user,
      //   key: "id",
      // },
    },
  },
  {
    modelName: "Lucia_user_association_client",
    tableName: "lucia_user_association_client",
    underscored: true,
    timestamps: true,
  }
);

// Client.belongsToMany(Lucia_user, {
//   through: Lucia_user_association_client,
// });
// Lucia_user.belongsToMany(Client, {
//   through: Lucia_user_association_client,
// });

Lucia_user_association_client.associate = (models) => {};
