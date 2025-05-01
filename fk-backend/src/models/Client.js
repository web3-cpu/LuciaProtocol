import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import bcrypt from "bcrypt";
import { Lucia_user } from "./LuciaUser.js";
import { Lucia_user_association_client } from "./Lucia_user_assoc_client.js";
import { User } from "./User.js";
import { User_association_client } from "./User_assoc_client.js";
import { encryptClientFields, decryptClientFields } from "../util/gdpr.js";

const HASH_COST = 10;

export const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
    },
    emailVerifyUrl: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
    },
    otpExpiry: {
      type: DataTypes.DATE,
      default: null,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: true,
    },
    isGuest: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    call_count: {
      type: DataTypes.INTEGER,
      default: null,
      allowNull: true,
    },
    onboarding: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: true,
    },
    deletedExpiry: {
      type: DataTypes.DATE,
      default: null,
      allowNull: true,
    },
  },
  {
    modelName: "Client",
    tableName: "client",
    underscored: true,
    timestamps: true,
    hooks: {
      beforeCreate: async (client, options) => {
        encryptClientFields(client);
        const hashedPassword = await bcrypt.hash(client.password, HASH_COST);
        client.password = hashedPassword;
      },
      beforeUpdate: (client) => {
        encryptClientFields(client);
      },
      afterFind: (client, options) => {
        if (!client) return;
        if (Array.isArray(client)) {
          client.forEach(u => {
            decryptClientFields(u);
          });
        } else {
          decryptClientFields(client);
        }
      }
    },
  }
);

Client.associate = (models) => {
  Client.belongsToMany(Lucia_user, {
    foreignKey: "id",
    through: Lucia_user_association_client,
    as: "Lucia_user",
  });
};

Client.associate = (models) => {
  Client.belongsToMany(User, {
    foreignKey: "id",
    through: User_association_client,
    as: "User",
  });
};
