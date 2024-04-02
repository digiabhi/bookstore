const { StatusCodes } = require("http-status-codes");

const { BookService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createBook(req, res) {
  try {
    const book = await BookService.createBook({
      bookId: req.body.bookId,
      sellCount: req.body.sellCount,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });
    SuccessResponse.data = book;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllBooks(req, res) {
  try {
    const books = await BookService.getAllBooks(req.query);
    SuccessResponse.data = books;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * POST : /books/:id
 * req-body {}
 */
async function getBook(req, res) {
  try {
    const book = await BookService.getBook(req.params.id);
    SuccessResponse.data = book;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSellCount(req, res) {
  try {
    const response = await BookService.updateCount({
      bookId: req.params.id,
      sellCount: req.body.sellCount,
      inc: req.body.inc,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateSellCount,
};
