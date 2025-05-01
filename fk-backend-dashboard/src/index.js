import app from "./app.js";
import "dotenv/config";
const port = process.env.NODE_PORT;

import { sequelize } from "./db/database.js";

async function main() {
  // set force to true to overwrite any existing tables - all data will be lost!
  try {
    await sequelize.sync({ force: false });
    app.listen(port,'0.0.0.0', () => {
      console.log(`listening on port ${port}`);
      console.log("Node type", process.env.NODE_ENV);
      console.log("NOde env", process.env.NODE_TYPE);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
