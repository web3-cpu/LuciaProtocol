import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./User.js";

export const User_details = sequelize.define(
  "user_details",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    user_agent: {
      type: DataTypes.STRING
    },
    memory: {
      type: DataTypes.INTEGER
    },
    cores: {
      type: DataTypes.INTEGER
    },
    plugin_count: {
      type: DataTypes.STRING
    },
    cookies_enabled: {
      type: DataTypes.BOOLEAN
    },
    timezone: {
      type: DataTypes.STRING
    },
    screen_width: {
      type: DataTypes.INTEGER
    },
    screen_height: {
      type: DataTypes.INTEGER
    },
    available_width: {
      type: DataTypes.INTEGER
    },
    available_height: {
      type: DataTypes.INTEGER
    },
    language: {
      type: DataTypes.STRING
    },
    device_pixel_ratio: {
      type: DataTypes.INTEGER
    },
    screen_orientation: {
      type: DataTypes.STRING
    },
    screen_orientation_angle: {
      type: DataTypes.INTEGER
    },
    canvas_hash: {
      type: DataTypes.STRING
    }
  },
  { 
    modelName: 'User_details',
    tableName: 'user_details',
    underscored: true,
    timestamps: true,
  }
);


User.hasMany(User_details, {
  foreignKey: "user_id"
});

User_details.belongsTo(User);