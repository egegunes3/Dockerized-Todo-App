import React, { useState, useEffect } from 'react';
import ToDoHeader from './components/ToDoHeader';
import Todos from './components/Todos';
import TaskForm from './components/TaskForm';
import axios from 'axios';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('/todos');
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addToDo = async (todo) => {
    const res = await fetch('/todos', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const data = await res.json();

    setTodos([...todos, data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="container">
      <ToDoHeader formToggle={() => setShowForm(!showForm)} currentState={showForm} />
      {showForm && <TaskForm addToDo={addToDo} />}
      {todos.length > 0 ? <Todos todos={todos} deleteTodo={deleteTodo} /> : 'No tasks!'}
    </div>
  );
};

export default App;
