const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') });

const Events = require('./models/books');

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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const aggregator = data => {
  let allBooks = [];
  for (let i = 0; i < data.length; i += 1) {
    const bookRecord = data[i].books;
    for (let j = 0; j < bookRecord.length; j += 1) {
      const currBook = bookRecord[j];
      // console.log(currBook);
      if (currBook.type === 'ADD_BOOK') {
        allBooks.push({ ...currBook.metadata, timestamp: currBook.timestamp });
      } else if (currBook.type === 'DELETE_BOOK') {
        allBooks.pop();
      }
    }
  }
  return allBooks;
};

app.get('/api/v1/books', async (req, res) => {
  try {
    console.log(req.query);
    const queryRegex = new RegExp(req.query.name, 'i');
    const books = await Events.aggregate([
      { $addFields: { 'metadata._id': '$metadata._id' } },
      { $sort: { timestamp: 1 } },
      { $group: { _id: '$metadata._id', books: { $push: '$$ROOT' } } },
      {
        $match:
          req.query.name.length > 0
            ? { 'books.metadata.name': { $regex: queryRegex } }
            : {}
      },
      { $project: { 'books.value': 0, 'books.__v': 0 } }
    ]);

    console.log(JSON.stringify(books, null, 2));
    const aggregatedBooks = aggregator(books);

    console.log('====================================');
    console.log(JSON.stringify(aggregatedBooks, null, 2));
    console.log('====================================');

    res.status(500).json({ success: true, data: aggregatedBooks });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

app.post('/api/v1/books', async (req, res) => {
  try {
    const newBook = {
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      author: req.body.author,
      imgUrl:
        req.body.imgUrl ||
        'https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png'
    };

    const newEvent = new Events({
      type: 'ADD_BOOK',
      metadata: newBook,
      timestamp: Date.now()
    });

    const savedEvent = await newEvent.save();

    console.log(savedEvent);

    res.json({ success: true, data: savedEvent.metadata });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

app.delete('/api/v1/books/:id', async (req, res) => {
  try {
    const newEvent = new Events({
      type: 'DELETE_BOOK',
      metadata: { _id: mongoose.Types.ObjectId(req.params.id) },
      timestamp: Date.now()
    });

    const savedEvent = await newEvent.save();

    console.log(savedEvent);

    res.json({ success: true, data: {} });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

module.exports = app;
