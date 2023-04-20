const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoute = require('./routes/todoRoutes');

mongoose
  .connect('mongodb://todo-database/ToDoDatabase')
  .then(() => console.log('Connected'))
  .catch(() => console.log('Not connected'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan());

app.use(todoRoute);

app.listen(5000, console.log('Running on 5000'));
