const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// const cors = require('cors');
const { URL } = require('url');
const fetch = require('node-fetch');

require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') });

const app = express();

app.use(helmet());
app.use(morgan('dev'));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/search', async (req, res) => {
  try {
    console.log(req.query);

    const booksHost =
      process.env.NODE_ENV === 'production' ? 'todo:3000' : 'localhost:3001';
    const booksUrl = new URL(`http://${booksHost}/api/v1/books`);
    Object.keys(req.query).forEach(key =>
      booksUrl.searchParams.append(key, req.query[key])
    );

    const todoHost =
      process.env.NODE_ENV === 'production' ? 'todo:3000' : 'localhost:3002';
    const todoUrl = new URL(`http://${todoHost}/api/v1/todo`);
    Object.keys(req.query).forEach(key =>
      todoUrl.searchParams.append(key, req.query[key])
    );

    const booksPromise = fetch(booksUrl);
    const todoPromise = fetch(todoUrl);

    // never do this... always use event bus instead
    const [books, todo] = await Promise.all([booksPromise, todoPromise]);

    const booksJson = await books.json();
    const todoJson = await todo.json();

    console.log('====================================');
    console.log(booksJson, todoJson);
    console.log('====================================');

    if (booksJson && booksJson.success && todoJson && todoJson.success) {
      res.json({ books: booksJson.data, todo: todoJson.data });
    } else {
      console.error('Something Bad Happened');
      res.status(500).json({ books: null, todo: null });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = app;
