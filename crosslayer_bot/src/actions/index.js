const { Markup } = require("telegraf");
const {
  createWeb3Wallet,
  createSubOrganization,
} = require("../config/account");
const { db } = require("../models");
require("dotenv").config();
const Wallets = db.wallets;
const Users = db.users;

const startAction = async (ctx) => {
  try {
    const userId = ctx.message.from.username;
    const userInfo = await Users.findOne({
      where: { user_id: userId },
      attributes: ["organization_id"],
    });
    if (!userInfo) {
      const subOrganizationId = await createSubOrganization(userId);
      const new_user = {
        user_id: userId,
        organization_id: subOrganizationId,
      };
      await Users.create(new_user);
    }
    const inlineKeyboard = Markup.inlineKeyboard([
      [
        { text: "Sign Up", callback_data: "sign_up" },
        { text: "My Wallets", callback_data: "wallet_list" },
        {
          text: "Delete Wallet",
          callback_data: "delete_wallet",
        },
      ],
      [
        { text: "Settings", callback_data: "settings" },
        { text: "Show Private Keys", callback_data: "show_private_keys" },
      ],
    ]);
    ctx.reply("Welcome", inlineKeyboard);
  } catch (err) {
    ctx.reply(`Something went wrong: ${JSON.stringify(err)}`);
  }
};

const handleSingUp = async (ctx) => {
  try {
    const userId = ctx.update.callback_query.from.username;
    const { organization_id: organizationId } = await Users.findOne({
      where: { user_id: userId },
      attributes: ["organization_id"],
    });
    let { privateKeyName, privateKeyId, address } = await createWeb3Wallet(
      userId,
      organizationId
    );
    const new_wallet = {
      user_id: userId,
      address: address,
      private_key_id: privateKeyId,
      private_key_name: privateKeyName,
      organization_id: organizationId,
    };
    Wallets.create(new_wallet)
      .then((data) => {
        ctx.reply(
          `Wallet created. Public key: ${address} \n\n Private key ID: ${privateKeyId}`
        );
      })
      .catch((err) => console.log("wallet create error: ", err));
  } catch (err) {
    ctx.reply(`Something went wrong: ${JSON.stringify(err)}`);
  }
};

const handleListWallet = async (ctx) => {
  const { username } = ctx.update.callback_query.from;
  Wallets.findAll({ where: { user_id: username }, attributes: ["address"] })
    .then((data) => {
      if (data.length > 0) {
        const returnStr = data
          .map((_data) => _data.dataValues.address)
          .join("\n");
        return ctx.reply(returnStr);
      } else {
        return ctx.reply("You don't have any wallets.");
      }
    })
    .catch((err) => {
      console.error("error: ", err);
    });
};

const handleDeleteWallet = async (ctx) => {
  const { username } = ctx.update.callback_query.from;
  Wallets.findAll({ where: { user_id: username }, attributes: ["address"] })
    .then((data) => {
      if (data.length > 0) {
        const returnMarkup = data.map((_data) => {
          return [
            {
              text: _data.dataValues.address,
              callback_data: `/delete_wallet ${_data.dataValues.address}`,
            },
          ];
        });
        return ctx.reply(
          "Choose from your wallets",
          Markup.inlineKeyboard(returnMarkup)
        );
      } else {
        return ctx.reply("You don't have any wallets.");
      }
    })
    .catch((err) => console.error("error: ", err));
};

const handleMessage = (ctx) => {
  if (ctx.message.text.includes("/delete_wallet")) {
    const walletAddress = ctx.message.text.split(" ")[1];
    ctx.reply(`${walletAddress} deleted`);
  }
};

const handleSettings = async (ctx) => {
  const settingsKeyboard = Markup.inlineKeyboard([
    [
      { text: "Menu Option 1", callback_data: "sign_up" },
      { text: "Menu Option 2", callback_data: "sign_up" },
    ],
  ]);
  ctx.reply(`Choose from the following expanded actions`, settingsKeyboard);
};

const showPrivateKeys = async (ctx) => {
  const { username } = ctx.update.callback_query.from;
  Wallets.findAll({
    where: { user_id: username },
    attributes: ["address", "private_key_id"],
  })
    .then((data) => {
      if (data.length > 0) {
        const returnStr = data
          .map((_data) => {
            return `${[_data.dataValues.address]}:${
              _data.dataValues.private_key_id
            }`;
          })
          .join("\n");
        return ctx.reply(returnStr);
      } else {
        return ctx.reply("You don't have any wallets.");
      }
    })
    .catch((err) => {
      console.error("error: ", err);
    });
};
const handleCallbackQuery = async (ctx) => {
  const { username } = ctx.update.callback_query.from;
  const messageData = ctx.update.callback_query.data;
  if (messageData.includes("/delete_wallet")) {
    const walletAddress = messageData.split(" ")[1];
    Wallets.destroy({ where: { user_id: username, address: walletAddress } })
      .then((num) => {
        if (num == 1)
          return ctx.reply(`${walletAddress} was deleted successfully.`);
        return ctx.reply(
          `Cannot delete ${walletAddress}. Maybe this was not found.`
        );
      })
      .catch((err) => {
        return ctx.reply(
          `Cannot delete ${walletAddress}. Maybe this was not found.`
        );
      });
  }
};
module.exports = {
  startAction,
  handleSingUp,
  handleListWallet,
  handleDeleteWallet,
  handleMessage,
  handleSettings,
  showPrivateKeys,
  handleCallbackQuery,
};
