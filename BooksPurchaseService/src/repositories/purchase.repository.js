const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");
const { Purchase } = require("../models");
const CrudRepository = require("./crud.repository");
const { Enums } = require("../utils/common");
const { CANCELLED, PURCHASED } = Enums.PURCHASE_STATUS;

class PurchaseRepository extends CrudRepository {
  constructor() {
    super(Purchase);
  }

  async createPurchase(data, transaction) {
    const response = await Purchase.create(data, { transaction: transaction });
    return response;
  }

  async get(data, transaction) {
    console.log(data);
    const response = await Purchase.findOne(
      { where: { purchaseId: data } },
      {
        transaction: transaction,
      }
    );
    if (!response) {
      throw new AppError(
        "Not able to fund the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async update(id, data, transaction) {
    // data -> {col: value, ....}
    const response = await Purchase.update(
      data,
      {
        where: {
          purchaseId: id,
        },
      },
      { transaction: transaction }
    );
    return response;
  }

  async cancelOldPurchases(timestamp) {
    console.log("in repo");
    const response = await Purchase.update(
      { status: CANCELLED },
      {
        where: {
          [Op.and]: [
            {
              createdAt: {
                [Op.lt]: timestamp,
              },
            },
            {
              status: {
                [Op.ne]: PURCHASED,
              },
            },
            {
              status: {
                [Op.ne]: CANCELLED,
              },
            },
          ],
        },
      }
    );
    return response;
  }
}

module.exports = PurchaseRepository;
