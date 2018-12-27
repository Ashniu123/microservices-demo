const mongoose = require("mongoose");
const path = require("path");
var db = mongoose.createConnection("mongodb://localhost:27017/books-write");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    eventType: {
      type: String,
      required: true
    },
    version: {
      type: Number,
      required: true
    },
    aggregateId: {
      type: String,
      required: true
    },
    payload: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = db.model("Event", EventSchema);
