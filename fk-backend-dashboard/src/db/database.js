import "dotenv/config";
import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    query_timeout: 60000,
    port: process.env.DB_PORT,
  }
);
