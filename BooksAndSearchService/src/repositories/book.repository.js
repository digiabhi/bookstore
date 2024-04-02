const CrudRepository = require("./crud.repository");
const { Book, Author } = require("../models");
const db = require("../models");
const { addRowLockOnBooks } = require("./queries");

class BookRepository extends CrudRepository {
  constructor() {
    super(Book);
  }

  // Function to get all the books
  async getAllBooks(filter, sort) {
    const response = await Book.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Author,
          as: "authors",
          attributes: ["name"],
        },
      ],
    });
    return response;
  }

  // Function to get the book by id
  async updateSellCount(bookId, quantity, inc = true) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnBooks(bookId));
      const book = await Book.findOne({
        where: { bookId: bookId },
      });
      if (+inc) {
        await book.increment(
          "sellCount",
          { by: quantity },
          { transaction: transaction }
        );
      } else {
        await book.decrement(
          "sellCount",
          { by: quantity },
          { transaction: transaction }
        );
      }
      await transaction.commit();
      await book.reload(); // Reload the book to get the updated value
      return book;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = BookRepository;
