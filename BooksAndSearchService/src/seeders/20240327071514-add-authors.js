"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Authors",
      [
        {
          name: "Abraham Stackhouse",
          authorId: "author-1",
          revenue: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Amelia Wangerin, Jr.",
          authorId: "author-2",
          revenue: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anastasia Inez",
          authorId: "author-3",
          revenue: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arthur McCrumb",
          authorId: "author-4",
          revenue: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arturo Hijuelos",
          authorId: "author-5",
          revenue: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more authors here following the same structure
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
