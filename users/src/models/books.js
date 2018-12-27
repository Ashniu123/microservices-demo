const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PromoSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  expiryDate:{
    type: Date,
    required: true
  },
  discount:{
    type: Number,
    required:true,
    default: 10
  },
  consumed:{
    type: Boolean,
    required: true,
    default: false
  },
  userId:{
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("BookSchema", BookSchema);
