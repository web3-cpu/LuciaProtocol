module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    organization_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Users;
};
