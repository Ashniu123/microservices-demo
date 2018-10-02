const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Todo', BookSchema);
