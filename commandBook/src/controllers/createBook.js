const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const ttypes = require("../gen-nodejs/books_types");
const commandHelper = require("./commandHelper");
const kafka = require("kafka-node");
const EventSchema = require("../models/event");
const BookSchema = require("../models/books");
const client = new kafka.KafkaClient(
  "127.0.0.1:2181",
  "create-book-command-client",
  {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  }
);
const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
  console.log("CreateBook: Kafka Producer is connected and ready.");
});
// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
  console.error(error);
});

module.exports = async (request, result) => {
  try {
    const bookId = mongoose.Types.ObjectId();
    request._id = bookId;
    request.createdAt = Date.now();
    request.updatedAt = Date.now();
    request.__v = 0;
    const res = await BookSchema.create(request);
    const event = {
      _id: uuid(),
      aggregateId: bookId.toString(),
      eventType: commandHelper.CREATED_BOOK,
      version: 0,
      payload: JSON.stringify(res),
      timestamp: Date.now()
    };
    const record = [
      {
        topic: "books",
        partition: 0,
        messages: new Buffer(JSON.stringify(event)),
        attributes: 1 /* Use GZip compression for the payload */
      }
    ];
    //Send record to Kafka and log result/error
    producer.send(record, async(err, data) => {
      if (err) {
        const err = new ttypes.BookException({
          code: ttypes.ErrorCode.SOMETHING_WRONG,
          message: e.message
        });
        result(err, null);
      } else {
        event.kafkaData = JSON.stringify(data.books);
        await EventSchema.create(event);
        event.payload = JSON.stringify(event.payload);
        // Storing event in DB
        console.log(`Event Created: ${commandHelper.CREATED_BOOK}`);
        const responseStatus = new ttypes.ResponseStatus({
          success: true,
          message: "Successfully Created",
          code: ttypes.SuccessCode.BOOK_CREATED
        });
        const book = new ttypes.Book({
          id: request._id.toString(),
          name: request.name,
          description: request.description,
          author: request.author,
          cost: request.cost,
          createdAt: "" + request.createdAt,
          updatedAt: "" + request.updatedAt,
          __v: 0
        });
        const createBookResponse = new ttypes.CreateBookResponse({
          responseStatus: responseStatus,
          book: book
        });
        result(null, createBookResponse);
      }
    });
  } catch (err) {
    const e = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: err.message
    });
    result(e, null);
  }
};
