const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { PurchaseRepository } = require("../repositories");
const { ServerConfig, BuyerQueue, AuthorQueue } = require("../config");
const db = require("../models");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { PURCHASED, CANCELLED } = Enums.PURCHASE_STATUS;

const purchaseRepository = new PurchaseRepository();

// Service to purchase a book
async function purchaseBook(data) {
  const transaction = await db.sequelize.transaction(); // Start a transaction
  try {
    const books = await axios.get(
      `${ServerConfig.BOOK_SERVICE}/api/v1/books/${data.bookId}`
    );
    const booksData = books.data.data;
    console.log("data values;", data);
    console.log(booksData);
    const count = await db.Purchase.count();
    console.log(count);

    const purchaseDate = new Date();
    const year = purchaseDate.getFullYear();
    const month = `${purchaseDate.getMonth() + 1}`.padStart(2, "0");
    const purchaseId = `${year}-${month}-${count + 1}`;
    const totalBillingAmount = data.quantity * booksData.price;
    const purchasePayload = {
      ...data,
      purchaseDate,
      purchaseId,
      price: booksData.price,
      totalAmount: totalBillingAmount,
    };
    console.log("Purchase Payload:-", purchasePayload);
    const booking = await purchaseRepository.create(
      purchasePayload,
      transaction
    );

    await axios.patch(
      `${ServerConfig.BOOK_SERVICE}/api/v1/books/${data.bookId}/sell`,
      {
        sellCount: data.quantity,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// Service to make payment
async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const purchaseDetails = await purchaseRepository.get(
      data.purchaseId,
      transaction
    );
    if (purchaseDetails.status === CANCELLED) {
      throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
    }
    const bookingTime = new Date(purchaseDetails.createdAt);
    const currentTime = new Date();
    // check if the booking is older than 5 mins
    if (currentTime - bookingTime > 300000) {
      await cancelBooking(data.purchaseId);
      throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
    }
    // check if the amount of the payment matches
    if (purchaseDetails.totalAmount !== data.totalAmount) {
      throw new AppError(
        "The amount of the payment doesnt match",
        StatusCodes.BAD_REQUEST
      );
    }
    // check if the user corresponding to the booking matches
    if (purchaseDetails.userId !== data.userId) {
      throw new AppError(
        "The user corresponding to the booking doesnt match",
        StatusCodes.BAD_REQUEST
      );
    }
    // we assume here that payment is successful
    await purchaseRepository.update(
      data.purchaseId,
      { status: PURCHASED },
      transaction
    );
    BuyerQueue.sendData({
      recepientEmail: "singhabhishek111213@gmail.com", // Buyer email id from database
      subject: "Book Purchased Successfully!",
      text: `Booking successfully done for the purchaseId ${data.purchaseId}`,
    });
    // await axios.patch(
    //   `${ServerConfig.BOOK_SERVICE}/api/v1/authors/${data.authorId}/increvenue`,
    //   {
    //     revenueAmount: data.totalAmount,
    //   }
    // ); // Implement Author Revenue Logic
    AuthorQueue.sendData({
      recepientEmail: "singhabhishek111213@gmail.com", // Author email id from database
      subject: "Book Sold Successfully!",
      text: `Book Sold with Id ${data.bookId}!`,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelBooking(purchaseId) {
  const transaction = await db.sequelize.transaction();
  try {
    const purchaseDetails = await purchaseRepository.get(
      purchaseId,
      transaction
    );
    console.log(purchaseDetails);
    if (purchaseDetails.status === CANCELLED) {
      await transaction.commit();
      return true;
    }
    await axios.patch(
      `${ServerConfig.BOOK_SERVICE}/api/v1/books/${purchaseDetails.bookId}/sell`,
      {
        sellCount: purchaseDetails.quantity,
        inc: 0,
      }
    );
    await purchaseRepository.update(
      purchaseId,
      { status: CANCELLED },
      transaction
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelOldPayments() {
  try {
    console.log("Inside service");
    const time = new Date(Date.now() - 1000 * 300); // time 5 mins ago
    const response = await purchaseRepository.cancelOldPurchases(time);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  purchaseBook,
  makePayment,
  cancelOldPayments,
};
