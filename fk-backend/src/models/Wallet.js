import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Lucia_user } from "./LuciaUser.js";
import { Lucia_user_association_wallet } from "./Lucia_user_assoc_wallet.js";

export const Wallet = sequelize.define(
  "wallet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    chain_id: {
      type: DataTypes.INTEGER,
    },
    network_name: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "Wallet",
    tableName: "wallet",
    underscored: true,
    timestamps: true,
  }
);

// User.associate = (models) => {
//   User.belongsToMany(Client, {
//     foreignKey: "id",
//     through: User_association_client,
//     as: "Client",
//   });
// };

Wallet.associate = (models) => {
  Wallet.belongsToMany(Lucia_user, {
    foreignKey: "id",
    through: Lucia_user_association_wallet,
    as: "Lucia_user",
  });
};
