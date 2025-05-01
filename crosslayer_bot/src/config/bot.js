const { Telegraf } = require("telegraf");
require("dotenv").config();

const { TOKEN } = process.env;

const bot = new Telegraf(TOKEN);

module.exports = bot;
