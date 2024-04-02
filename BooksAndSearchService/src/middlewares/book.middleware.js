const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.authors) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(["authors not found in the oncoming request in the correct form"], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  if (!req.body.title) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(["Title not found in the oncoming request in the correct form"], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(["Price not found in the oncoming request in the correct form"], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  if (req.body.price < 100 || req.body.price > 1000) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(["Price cannot be less than 100 and more than 1000"], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  next();
}

function validateUpdateSellCountRequest(req, res, next) {
  if (!req.body.sellCount) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(["sellCount not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateSellCountRequest
};