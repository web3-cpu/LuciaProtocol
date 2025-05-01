require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: process.env.DB_AUTH,
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = sequelize;
