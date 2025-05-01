import { DataTypes } from "sequelize";
 import { sequelize } from "../db/database.js";
 import { Client } from "./Client.js";
 import { User } from "./User.js"
 import { Fingerprint } from "./Fingerprint.js";

export const Page_view = sequelize.define(
  "page_view",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER
    },
    page: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    timestamp: {
      type: DataTypes.TIME
    },
    fingerprint_id:{
      type: DataTypes.INTEGER
    }
  },
  { 
    modelName: 'Page_view',
    tableName: 'page_view',
    underscored: true,
    timestamps: true,
  }
);

User.hasMany(Page_view, {
  foreignKey: "user_id"
});

Page_view.belongsTo(User);

Client.hasMany(Page_view, {
  foreignKey: "client_id",
});

Page_view.belongsTo(Client);

Fingerprint.hasMany(Page_view, {
  foreignKey: "fingerprint_id",
});

Page_view.belongsTo(Fingerprint);