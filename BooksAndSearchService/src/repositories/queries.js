// Used to store all the raw queries used in the application
function addRowLockOnBooks(bookId) {
  return `SELECT * from Books WHERE Books.bookId = "${bookId}" FOR UPDATE;`;
}

function addRowLockOnAuthorRevenue(authorId) {
  return `SELECT * from Authors WHERE Authors.authorId = "${authorId}" FOR UPDATE;`;
}

module.exports = {
  addRowLockOnBooks,
  addRowLockOnAuthorRevenue,
};
