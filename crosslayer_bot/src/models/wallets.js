module.exports = (sequelize, Sequelize) => {
  const Wallets = sequelize.define("wallets", {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    private_key_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    organization_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    private_key_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Wallets;
};
