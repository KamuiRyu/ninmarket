"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
          "users",
          [
            {
              ninja_name: "API",
              email: "api@ninmarket.com",
              password: await bcrypt.hash("qr8ADP3CUd2CAR44u&$k0V$qhnU9PX", 10),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              ninja_name: "Hyoou",
              email: "admin@ninmarket.com",
              password: await bcrypt.hash("Senha@2023", 10),
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
