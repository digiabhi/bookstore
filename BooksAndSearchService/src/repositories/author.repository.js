const CrudRepository = require("./crud.repository");
const { Author } = require("../models");
const db = require("../models");
const { addRowLockOnAuthorRevenue } = require("./queries");

class AuthorRepository extends CrudRepository {
  constructor() {
    super(Author);
  }

  async updateRevenue(authorId, amount, inc = true) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnAuthorRevenue(authorId));
      const author = await Author.findOne({
        where: { authorId: authorId },
      });
      if (+inc) {
        await author.increment(
          "revenue",
          { by: amount },
          { transaction: transaction }
        );
      } else {
        await author.decrement(
          "revenue",
          { by: amount },
          { transaction: transaction }
        );
      }
      await transaction.commit();
      await author.reload(); // Reload the author to get the updated value
      return author;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = AuthorRepository;
