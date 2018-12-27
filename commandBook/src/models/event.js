const mongoose = require("mongoose");
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
    kafkaData: {
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

module.exports = mongoose.model("Event", EventSchema);
