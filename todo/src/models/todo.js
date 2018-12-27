const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    enum: ["planning", "analysis", "design", "implementation", "testing"],
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("TodoEvent", EventSchema);
