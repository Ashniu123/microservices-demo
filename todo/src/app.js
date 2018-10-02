const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') });

const Todo = require('./models/todo');

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

app.get('/api/v1/todo', async (req, res) => {
  try {
    console.log(req.query);
    const queryRegex = new RegExp(req.query.name, 'i');
    const todoList = await Todo.find(
      req.query.name.length > 0 ? { name: { $regex: queryRegex } } : {}
    );
    res.json({ success: true, data: todoList });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

app.post('/api/v1/todo', async (req, res) => {
  try {
    console.log(req.body);
    const newTodo = new Todo({ name: req.body.name, timestamp: Date.now() });
    const savedTodo = await newTodo.save();
    res.json({ success: true, data: savedTodo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

app.put('/api/v1/todo/:id', async (req, res) => {
  try {
    const todoItem = await Todo.findById(req.params.id);
    console.log(todoItem);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      const savedTodo = await todoItem.save();
      res.json({ success: true, data: savedTodo });
    } else {
      res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

app.delete('/api/v1/todo/:id', async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

module.exports = app;
