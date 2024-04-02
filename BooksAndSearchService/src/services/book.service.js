const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const {
  BookRepository,
  AuthorBookRelationRepository,
} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const bookRepository = new BookRepository();
const authorBookRelationRepository = new AuthorBookRelationRepository();

async function createBook(data) {
  try {
    const book = await bookRepository.create(data);
    await authorBookRelationRepository.create(data.bookId, data.authorId);
    return book;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new book",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllBooks(query) {
  const customFilter = {};
  let sortFilter = [];
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 1000 : maxPrice],
    };
  }
  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }
  try {
    const books = await bookRepository.getAllBooks(customFilter, sortFilter);
    return books;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the books",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getBook(id) {
  try {
    const book = await bookRepository.get(id);
    return book;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The book you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of the book",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCount(data) {
  try {
    const response = await bookRepository.updateSellCount(
      data.bookId,
      data.sellCount,
      data.inc
    );
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot update data of the book",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateCount,
};
