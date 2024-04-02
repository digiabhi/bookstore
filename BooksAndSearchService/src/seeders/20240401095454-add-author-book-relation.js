"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "AuthorBookRelations",
      [
        {
          authorId: "author-1",
          bookId: "book-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: "author-1",
          bookId: "book-5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: "author-2",
          bookId: "book-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: "author-2",
          bookId: "book-4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: "author-3",
          bookId: "book-3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: "author-4",
          bookId: "book-4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: "author-5",
          bookId: "book-5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AuthorBookRelations", null, {});
  },
};
