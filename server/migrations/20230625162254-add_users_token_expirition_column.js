module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "token_expirationTime", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "token_expirationTime");
  },
};
