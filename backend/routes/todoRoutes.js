const router = require('express').Router();
const todo = require('../models/todo');

router.get('/todos', async (req, res) => {
  const toDos = await todo.find();
  res.json(toDos);
});

router.post('/todos', async (req, res) => {
  const newTodo = new todo({
    text: req.body.text
  });
  const savedToDo = await newTodo.save();
  res.json(savedToDo);
});

router.delete('/todos/:id', async (req, res) => {
  await todo.findByIdAndDelete(req.params.id);
  res.end();
});

module.exports = router;
