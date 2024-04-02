const CrudRepository = require("./crud.repository");
const { BookSold } = require("../models");

class BookSoldRepository extends CrudRepository {
  constructor() {
    super(BookSold);
  }

  async getPendingPurchases() {
    const response = await BookSold.findAll({
      where: {
        status: "PENDING",
      },
    });
    return response;
  }
}

module.exports = BookSoldRepository;
