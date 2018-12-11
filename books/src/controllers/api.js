const ping = require("./ping");
const createBook = require("./createBook");
const updateBook = require("./updateBook");
const getBook = require("./getBook");
const listBook = require("./listBook");
const deleteBook = require("./deleteBook");
// eslint-disable-next-line
module.exports = {
  ping: ping,
  createBook: createBook,
  updateBook: updateBook,
  getBook: getBook,
  listBook: listBook,
  deleteBook: deleteBook
};
