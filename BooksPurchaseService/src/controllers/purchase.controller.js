const { StatusCodes } = require("http-status-codes");
const { PurchaseService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

// In-memory database to store idempotency keys
const inMemDb = {};

// Controller to purchase a book
async function purchaseBook(req, res) {
  try {
    const response = await PurchaseService.purchaseBook({
      bookId: req.body.bookId,
      userId: req.body.userId,
      quantity: req.body.quantity,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// Controller to make payment
async function makePayment(req, res) {
  try {
    // Get idempotency key from headers
    const idempotencyKey = req.headers["x-idempotency-key"];

    // Check if idempotency key is present
    if (!idempotencyKey) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "idempotency key missing" });
    }
    // Check if the payment is already made
    if (inMemDb[idempotencyKey]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Cannot retry on a successful payment" });
    }

    // Make payment
    const response = await PurchaseService.makePayment({
      totalAmount: req.body.totalAmount,
      userId: req.body.userId,
      purchaseId: req.body.purchaseId,
    });
    inMemDb[idempotencyKey] = idempotencyKey; // Store idempotency key in memory
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  purchaseBook,
  makePayment,
};
