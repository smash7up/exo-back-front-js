import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({description: ""});

  const getTodos = async() => {
    const response = await fetch("http://localhost:5000/todos", {
      method: 'GET', // GET, POST, PUT, DELETE
    });
    const data = await response.json(); // fetch ne transforme pas les données en json, axios le fait
    setTodos(data.result)
    console.warn('data', data)
  }

  const postTodos = () => {
    fetch("http://localhost:5000/todos", {
      method: 'POST', //GET,...
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    .then(() => {
      getTodos();
      setTodo ({ description: "" });
    })
    .catch(() => {
      // setErrorState
    })
  }

  const updateTodos = id => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: todo.description }),
    }).then(() => {
      getTodos();
    })
  }

  const deleteTodos = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE', //GET, PUT,...
    })
    .then(()=> {
      getTodos();
    })
  }

  const handleTask = (e) => {
    setTodo({description: e.target.value})
  }

  useEffect(() => {
    getTodos();
  }, []);
    
  return (
    <div className="App">
      <input type="text" value={todo.description} onChange={(e) => handleTask(e)} />
      <button type="button" onClick={postTodos}>Add a task</button>
      {todos.map(task => (
        <div key={task.id}>{task.description}
          <input type="checkbox" onClick={() => deleteTodos(task.id)} />
          <button type="button" onClick={() => updateTodos(task.id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default App;
