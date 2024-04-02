const express = require("express");

const { AuthorController } = require("../../controllers");
const { AuthorMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/authors POST
router.post(
  "/",
  AuthorMiddlewares.validateCreateRequest,
  AuthorController.createAuthor
);

// /api/v1/authors GET
router.get("/", AuthorController.getAuthors);

// /api/v1/authors/:id GET
router.get("/:id", AuthorController.getAuthor);

// /api/v1/authors/:id DELETE
router.delete("/:id", AuthorController.destroyAuthor);

// /api/v1/authors/:id/increvenue PATCH
router.patch(
  "/:id/increvenue",
  AuthorMiddlewares.validateUpdateRevenueRequest,
  AuthorController.updateRevenue
);

module.exports = router;
