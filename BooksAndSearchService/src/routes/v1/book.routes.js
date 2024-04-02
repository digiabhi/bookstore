const express = require("express");

const { BookController } = require("../../controllers");
const { BookMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/books POST
router.post("/", 
  BookMiddlewares.validateCreateRequest,
  BookController.createBook);

// /api/v1/books?price=100-200 GET
router.get("/", 
  BookController.getAllBooks);

// /api/v1/books/:id GET
router.get("/:id", 
  BookController.getBook);
// /api/v1/books/:id/sell PATCH
router.patch(
  "/:id/sell", 
  BookMiddlewares.validateUpdateSellCountRequest,
  BookController.updateSellCount
);
module.exports = router;