const { StatusCodes } = require("http-status-codes");

const { AuthorService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /authors
 * req-body {name: 'Christopher Nolan'}
 */
async function createAuthor(req, res) {
  try {
    const author = await AuthorService.createAuthor({
      authorId: req.body.authorId,
      name: req.body.name,
    });
    SuccessResponse.data = author;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * POST : /authors
 * req-body {}
 */
async function getAuthors(req, res) {
  try {
    const authors = await AuthorService.getAuthors();
    SuccessResponse.data = authors;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * POST : /authors/:id
 * req-body {}
 */
async function getAuthor(req, res) {
  try {
    const authors = await AuthorService.getAuthor(req.params.id);
    SuccessResponse.data = authors;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * DELETE : /authors/:id
 * req-body {}
 */
async function destroyAuthor(req, res) {
  try {
    const authors = await AuthorService.destroyAuthor(req.params.id);
    SuccessResponse.data = authors;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateRevenue(req, res) {
  try {
    const response = await AuthorService.updateRevenue({
      authorId: req.params.id,
      revenueAmount: req.body.revenueAmount,
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
  createAuthor,
  getAuthors,
  getAuthor,
  destroyAuthor,
  updateRevenue,
};
