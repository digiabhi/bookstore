const { StatusCodes } = require("http-status-codes");

const {
  AuthorRepository,
  AuthorBookRelationRepository,
} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const authorRepository = new AuthorRepository();
const authorBookRelationRepository = new AuthorBookRelationRepository();

async function createAuthor(data) {
  try {
    const author = await authorRepository.create(data);
    await authorBookRelationRepository.create(data.bookId, data.authorId);
    return author;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Author",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAuthors() {
  try {
    const authors = await authorRepository.getAll();
    return authors;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the authors",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAuthor(id) {
  try {
    const author = await authorRepository.get(id);
    return author;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The author you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of all the authors",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAuthor(id) {
  try {
    const response = await authorRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The author you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of all the authors",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateRevenue(data) {
  try {
    const response = await authorRepository.updateRevenue(
      data.authorId,
      data.revenueAmount,
      data.inc
    );
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot update revenue of author",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  destroyAuthor,
  updateRevenue,
};
