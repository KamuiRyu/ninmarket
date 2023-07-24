"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
          "users",
          [
            {
              name: "Hyoou",
              email: "admin@ninmarket.com",
              password: await bcrypt.hash("Senha@2023", 10),
              role_id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("users", null, {});
    },
};
