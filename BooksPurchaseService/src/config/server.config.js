const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  BOOK_SERVICE: process.env.BOOK_SERVICE,
};
