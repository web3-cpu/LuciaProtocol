require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bot = require("./src/config/bot");
const botActions = require("./src/actions");
const { db } = require("./src/models");
const app = express();
app.use(bodyParser.json());

// bot actions

bot.start(botActions.startAction);

bot.action("sign_up", botActions.handleSingUp);

bot.action("wallet_list", botActions.handleListWallet);

bot.action("delete_wallet", botActions.handleDeleteWallet);

bot.action("settings", botActions.handleSettings);

bot.action("show_private_keys", botActions.showPrivateKeys);

bot.on("callback_query", botActions.handleCallbackQuery);

bot.on("message", botActions.handleMessage);

/////////////////////////////////////////////////////////////////

const init = async () => {
  db.sequelize
    .sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
  bot
    .launch()
    .then(() => console.log("bot successfully started"))
    .catch((error) => console.log("error: ", error))
    .finally(() => console.log("here"));
};

app.listen(process.env.port || 5050, async () => {
  console.log("App running on port", process.env.PORT || 5050);
  await init();
});
