import React, { useState, useEffect } from 'react';
import ToDoHeader from './components/ToDoHeader';
import Todos from './components/Todos';
import TaskForm from './components/TaskForm';
import axios from 'axios';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);

  const API_BASE = 'http://todo-backend-service';

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get(`${API_BASE}/todos`);
      console.log('Sunucudan gelen todos:', data);
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addToDo = async (todo) => {
    console.log('Gönderilen todo:', todo);
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const data = await res.json();
    console.log('Backend cevabı:', data);
    setTodos([...todos, data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE}/todos/${id}`);
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
