const ping = require("./ping");
const getBook = require("./getBook");
const createBook = require("./createBook");
const { updateBook } = require("./updateBook");
const deleteBook = require("./deleteBook");
// eslint-disable-next-line
module.exports = {
  ping,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
