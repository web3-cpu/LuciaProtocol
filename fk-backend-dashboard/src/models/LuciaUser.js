import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Client } from "./Client.js";
import { Lucia_user_association_client } from "./Lucia_user_assoc_client.js";
import { Lucia_user_association_user } from "./Lucia_user_assoc_user.js";
import { Wallet } from "./Wallet.js";
import { Lucia_user_association_wallet } from "./Lucia_user_assoc_wallet.js";

export const Lucia_user = sequelize.define(
  "lucia_user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    info: {
      type: DataTypes.JSONB,
    },
    local_storage_hash_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    unique_hash: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "Lucia_user",
    tableName: "lucia_user",
    underscored: true,
    timestamps: true,
  }
);

Lucia_user.associate = (models) => {
  Lucia_user.belongsToMany(Client, {
    foreignKey: "id",
    through: Lucia_user_association_client,
    as: "Client",
  });
};

Lucia_user.associate = (models) => {
  Lucia_user.belongsToMany(User, {
    foreignKey: "id",
    through: Lucia_user_association_user,
    as: "User",
  });
};

Lucia_user.associate = (models) => {
  Lucia_user.belongsToMany(Wallet, {
    foreignKey: "id",
    through: Lucia_user_association_wallet,
    as: "Wallet",
  });
};
