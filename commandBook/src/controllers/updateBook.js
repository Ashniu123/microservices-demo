const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const kafka = require("kafka-node");
const ttypes = require("../gen-nodejs/books_types");
const commandHelper = require("./commandHelper");
const BookSchema = require("../models/books");
const EventSchema = require("../models/event");
const { lock, unlock } = require("../utils/mutexHelper");
const client = new kafka.KafkaClient(
  "127.0.0.1:2181",
  "update-book-command-client",
  { maxAsyncRequests: 1, sessionTimeout: 300, spinDelay: 100, retries: 2 }
);

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
  console.log("UpdateBook: Kafka Producer is connected and ready.");
});

producer.on("error", function(error) {
  console.error(error);
});

module.exports = async (request, result) => {
  try {
    await lock(request.bookId);
    update = await validate(request, result);
    if (update) {
      const query = { _id: mongoose.Types.ObjectId(request.bookId) };
      const updatedDoc = await BookSchema.findOneAndUpdate(
        query,
        { $set: update, $inc: { __v: 1 } },
        {
          new: true,
          useFindAndModify: false
        }
      );
      if (!updatedDoc) {
        const err = new ttypes.BookException({
          code: ttypes.ErrorCode.NOT_FOUND,
          message: "No book with bookId"
        });
        unlock(request.bookId);
        result(err, null);
      } else {
        console.log("--" + updatedDoc.__v);
        const event = {
          _id: uuid(),
          aggregateId: request.bookId,
          eventType: commandHelper.UPDATED_BOOK,
          version: parseInt(updatedDoc.__v),
          payload: JSON.stringify(request),
          timestamp: Date.now()
        };
        console.log(updatedDoc.__v);
        const record = [
          {
            topic: "books",
            partition: 0,
            messages: new Buffer(JSON.stringify(event)),
            attributes: 1 /* Use GZip compression for the payload */
          }
        ];
        producer.send(record, async(err, data) => {
          if (err) {
            console.log(err);
          } else {
            event.kafkaData = JSON.stringify(data.books);
            await EventSchema.create(event);
            console.log(updatedDoc.__v);
            event.payload = JSON.stringify(event.payload);
            console.log(`Event Created: ${commandHelper.UPDATED_BOOK}`);
            const responseStatus = new ttypes.ResponseStatus({
              success: true,
              message: "Successfully Updated",
              code: ttypes.SuccessCode.BOOK_UPDATED
            });
            unlock(request.bookId);
            result(null, responseStatus);
            console.log(`UpdateBook: ${JSON.stringify(responseStatus)}`);
          }
        });
      }
    }
  } catch (err) {
    const e = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: err.message
    });
    unlock(request.bookId);
    result(e, null);
    return false;
  }
};

const validate = async request =>
  new Promise(async (resolve, reject) => {
    if (!("bookId" in request)) {
      const err = new ttypes.BookException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "bookId required!"
      });
      reject(err);
    }
    if (!mongoose.Types.ObjectId.isValid(request.bookId)) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "bookId should be valid mongo id"
      });
      reject(err);
    }
    const bookData = await BookSchema.findOne(
      { _id: request.bookId },
      { isDeleted: 1 }
    );
    if (bookData.isDeleted) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.UNAUTHORISED,
        message: "Book has been deleted!"
      });
      reject(err);
    }
    request.updatedAt = Date.now();
    const update = {};
    if (request.name) update.name = request.name;
    if (request.author) update.author = request.author;
    if (request.description) update.description = request.description;
    if (request.cost) update.cost = request.cost;
    if (Object.keys(update).length) {
      resolve(update);
    } else {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "No fields to update"
      });
      reject(err);
    }
  });
