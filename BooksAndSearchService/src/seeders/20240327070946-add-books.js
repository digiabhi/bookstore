"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "Alanna Saves the Day",
          bookId: "book-1",
          price: 500,
          description:
            "Alanna Saves the Day is an adventurous tale of a young heroine who defies societal norms to protect her kingdom from impending doom. Follow Alanna on her journey as she battles evil forces and discovers her true destiny.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Post Alley",
          bookId: "book-2",
          price: 350,
          description:
            "Post Alley is a gripping mystery novel set in the heart of a bustling city. Join detective Jack Harper as he unravels a series of puzzling crimes that lead him down a path of danger and intrigue.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Thatchwork Cottage",
          bookId: "book-3",
          price: 275,
          description:
            "Thatchwork Cottage is a heartwarming story of love and redemption set in the quaint countryside. Follow the journey of Sarah as she restores an old cottage and discovers the true meaning of home.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Triscanipt",
          bookId: "book-4",
          price: 450,
          description:
            "The Triscanipt is a fantasy epic filled with magic and adventure. Join the young hero on a quest to save his kingdom from the dark forces threatening to consume it. Will he succeed or fall to the shadows?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Adventures of Kaya",
          bookId: "book-5",
          price: 800,
          description:
            "Adventures of Kaya is a thrilling sci-fi novel that takes readers on a journey through time and space. Join Kaya as she battles aliens, uncovers ancient mysteries, and navigates the complexities of interstellar politics.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more books here following the same structure
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
    await queryInterface.bulkDelete("Books", null, {});
  },
};
