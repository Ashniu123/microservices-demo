const path = require("path");
const mongoose = require("mongoose");
const thrift = require("thrift");
const BookService = require("./gen-nodejs/BookService");
require("dotenv").config({ path: path.resolve(__dirname, "config", ".env") });
const apiController = require("./controllers/api");

/**
 * MongoDB Connection
 */
mongoose.connect(
  process.env.MONGO_URI,
  err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected to database!");
    }
  }
);
/**
 * Thrift Connection
 */
const thriftOptions = {
  protocol: thrift.TCompactProtocol,
  transport: thrift.TFramedTransport
};
const app = thrift.createServer(BookService, apiController, thriftOptions);
module.exports = app;
