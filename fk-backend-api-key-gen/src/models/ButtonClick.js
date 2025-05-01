import { DataTypes } from "sequelize";
 import { sequelize } from "../db/database.js";
 import { Client } from "./Client.js";
 import { User } from "./User.js"
 import { Fingerprint } from "./Fingerprint.js";

export const Button_click = sequelize.define(
  "button_click",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER
    },
    button: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    fingerprint_id:{
      type: DataTypes.INTEGER
    }

  },
  { 
    modelName: 'Button_click',
    tableName: 'button_click',
    underscored: true,
    timestamps: true,
  }
);

User.hasMany(Button_click, {
  foreignKey: "user_id"
});

Button_click.belongsTo(User);

Client.hasMany(Button_click, {
  foreignKey: "client_id",
});

Button_click.belongsTo(Client);

Fingerprint.hasMany(Button_click, {
  foreignKey: "fingerprint_id",
});

Button_click.belongsTo(Fingerprint);
