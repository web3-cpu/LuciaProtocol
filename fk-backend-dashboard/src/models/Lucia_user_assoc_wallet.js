import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Lucia_user_association_wallet = sequelize.define(
  "lucia_user_association_wallet",
  {
    wallet_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
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
    modelName: "Lucia_user_association_wallet",
    tableName: "lucia_user_association_wallet",
    underscored: true,
    timestamps: true,
  }
);

// User.belongsToMany(Lucia_user, {
//   through: Lucia_user_association_user,
// });
// Lucia_user.belongsToMany(User, {
//   through: Lucia_user_association_user,
// });

Lucia_user_association_wallet.associate = (models) => {};
