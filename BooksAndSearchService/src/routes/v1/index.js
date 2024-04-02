const express = require("express");

const { InfoController } = require("../../controllers");

const authorRoutes = require("./author.routes");

const bookRoutes = require("./book.routes");

const router = express.Router();

router.use("/authors", authorRoutes);

router.use("/books", bookRoutes);

router.get("/info", InfoController.info);

module.exports = router;
