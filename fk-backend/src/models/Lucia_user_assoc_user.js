import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Lucia_user } from "./LuciaUser.js";
import { User } from "./User.js";

export const Lucia_user_association_user = sequelize.define(
  "lucia_user_association_user",
  {
    user_id: {
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
    modelName: "Lucia_user_association_user",
    tableName: "lucia_user_association_user",
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

Lucia_user_association_user.associate = (models) => {};
