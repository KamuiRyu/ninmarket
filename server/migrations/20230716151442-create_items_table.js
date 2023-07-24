'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug: {
        type: Sequelize.STRING(650),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.JSON,
        allowNull: false
      },
      description: {
        type: Sequelize.JSON,
        allowNull: false
      },
      type: {
        type: Sequelize.JSON,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING(650),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};
