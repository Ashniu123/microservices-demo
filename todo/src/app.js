const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') });

const Events = require('./models/todo');

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
  let allTodos = [];
  for (let i = 0; i < data.length; i += 1) {
    const todoRecord = data[i].todo;
    for (let j = 0; j < todoRecord.length; j += 1) {
      const currTodo = todoRecord[j];
      // console.log(currTodo);
      if (currTodo.type === 'ADD_TODO') {
        allTodos.push({ ...currTodo.metadata, timestamp: currTodo.timestamp });
      } else if (currTodo.type === 'UPDATE_TODO') {
        allTodos = allTodos.map(todo => {
          if (todo._id.toString() === currTodo.metadata._id.toString()) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
      } else if (currTodo.type === 'DELETE_TODO') {
        allTodos.pop();
      }
    }
  }
  return allTodos;
};

app.get('/api/v1/todo', async (req, res) => {
  try {
    console.log(req.query);
    const queryRegex = new RegExp(req.query.name, 'i');
    const todoList = await Events.aggregate([
      { $addFields: { 'metadata._id': '$metadata._id' } },
      { $sort: { timestamp: 1 } },
      { $group: { _id: '$metadata._id', todo: { $push: '$$ROOT' } } },
      {
        $match:
          req.query.name.length > 0
            ? { 'todo.metadata.name': { $regex: queryRegex } }
            : {}
      },
      { $project: { 'todo.value': 0, 'todo.__v': 0 } }
    ]);

    console.log(JSON.stringify(todoList, null, 2));
    const aggregatedTodoList = aggregator(todoList);

    console.log('====================================');
    console.log(JSON.stringify(aggregatedTodoList, null, 2));
    console.log('====================================');

    res.status(500).json({ success: true, data: aggregatedTodoList });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, data: null });
  }
});

app.post('/api/v1/todo', async (req, res) => {
  try {
    console.log(req.body);
    const newTodo = {
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      completed: false
    };

    const newEvent = new Events({
      type: 'ADD_TODO',
      metadata: newTodo,
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

app.put('/api/v1/todo/:id', async (req, res) => {
  try {
    const todoItem = await Events.findOne(
      {
        'metadata._id': mongoose.Types.ObjectId(req.params.id)
      },
      [],
      { limit: 1, sort: { timestamp: -1 } }
    );
    console.log(todoItem);
    if (todoItem) {
      const newEvent = new Events({
        type: 'UPDATE_TODO',
        metadata: { _id: mongoose.Types.ObjectId(req.params.id) },
        timestamp: Date.now()
      });

      const savedEvent = await newEvent.save();

      console.log(savedEvent);

      res.json({ success: true, data: {} });
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
    const newEvent = new Events({
      type: 'DELETE_TODO',
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
