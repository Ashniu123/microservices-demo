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
  "delete-book-command-client",
  { maxAsyncRequests: 1, sessionTimeout: 300, spinDelay: 100, retries: 2 }
);

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
  console.log("DeleteBook: Kafka Producer is connected and ready.");
});

producer.on("error", function(error) {
  console.error(error);
});

module.exports = async (request, result) => {
  try {
    await lock(request);
    await validate(request);
    const query = { _id: mongoose.Types.ObjectId(request) };
    const updatedDoc = await BookSchema.findOneAndUpdate(
      query,
      { $set: { isDeleted: true }, $inc: { __v: 1 } },
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
      unlock(request);
      result(err, null);
    } else {
      const event = {
        _id: uuid(),
        aggregateId: request,
        eventType: commandHelper.DELETED_BOOK,
        version: parseInt(updatedDoc.__v),
        payload: "{}",
        timestamp: Date.now()
      };
      await EventSchema.create(event);
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
          event.payload = "";
          console.log(`Event Created: ${commandHelper.DELETED_BOOK}`);
          const responseStatus = new ttypes.ResponseStatus({
            success: true,
            message: "Successfully Deleted",
            code: ttypes.SuccessCode.BOOK_UPDATED
          });
          unlock(request);
          result(null, responseStatus);
          console.log(`DeleteBook: ${JSON.stringify(responseStatus)}`);
        }
      });
    }
  } catch (error) {
    const err = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: error.message
    });
    result(err, null);
  }
};

const validate = async id =>
  new Promise(async(resolve, reject) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "bookId should be valid mongo id"
      });
      reject(err);
    }
    const bookData = await BookSchema.findOne({ _id: id }, { isDeleted: 1 });
    if (bookData.isDeleted) {
      console.log(1);
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.UNAUTHORISED,
        message: "Book has been deleted!"
      });
      reject(err);
    }
    resolve();
  });
