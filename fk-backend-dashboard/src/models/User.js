import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Lucia_user } from "./LuciaUser.js";
import { Lucia_user_association_user } from "./Lucia_user_assoc_user.js";
import { User_association_client } from "./User_assoc_client.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    user_info: {
      type: DataTypes.JSONB,
    },
  },
  {
    modelName: "User",
    tableName: "user",
    underscored: true,
    timestamps: true,
  }
);

User.associate = (models) => {
  User.belongsToMany(Client, {
    foreignKey: "id",
    through: User_association_client,
    as: "Client",
  });
};

User.associate = (models) => {
  User.belongsToMany(Lucia_user, {
    foreignKey: "id",
    through: Lucia_user_association_user,
    as: "Lucia_user",
  });
};
