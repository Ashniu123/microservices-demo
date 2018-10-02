const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') });

const Books = require('./models/books');
mongoose.connect(
  process.env.MONGO_URI,
  err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected to database!');
    }
  }
);

const app = express();

app.use(helmet());
app.use(morgan('dev'));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/books', async (req, res) => {
  try {
    console.log(req.query);
    const queryRegex = new RegExp(req.query.name, 'i');
    const books = await Books.find(
      req.query.name.length > 0 ? { name: { $regex: queryRegex } } : {}
    );
    res.status(500).json({ success: true, data: books });
  } catch (e) {
    res.status(500).json({ success: false, data: null });
  }
});

app.post('/api/v1/books', async (req, res) => {
  try {
    const newBook = new Books({
      name: req.body.name,
      author: req.body.author,
      imgUrl:
        req.body.imgUrl ||
        'https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png',
      timestamp: Date.now()
    });

    const savedBook = await newBook.save();
    res.json({ success: true, data: savedBook });
  } catch (e) {
    res.status(500).json({ success: false, data: null });
  }
});

app.delete('/api/v1/books/:id', async (req, res) => {
  try {
    const result = await Books.deleteOne({ _id: req.params.id });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(500).json({ success: false, data: null });
  }
});

module.exports = app;
