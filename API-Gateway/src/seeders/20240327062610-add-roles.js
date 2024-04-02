"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "author",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "retail_user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
