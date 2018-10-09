const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  metadata: Schema.Types.Mixed,
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('TodoEvent', EventSchema);
