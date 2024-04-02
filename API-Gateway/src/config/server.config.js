const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SEARCH_SERVICE: process.env.SEARCH_SERVICE,
  PURCHASE_SERVICE: process.env.PURCHASE_SERVICE,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};
