const ping = require("./ping");
const createBook = require("./createBook");
const updateBook = require("./updateBook");
const deleteBook = require("./deleteBook");
// eslint-disable-next-line
module.exports = {
  ping: ping,
  createBook,
  updateBook,
  deleteBook
};
