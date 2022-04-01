import React, { useState, useEffect } from 'react';
import './App.css';
import Row from './Row';

function App() {
  const savedTodo = JSON.parse(localStorage.getItem("todo-items")) || [];
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState(savedTodo);
  const [todoBackup, setTodoBackup] = useState([]);
  const incompleteCount = todo.filter(item => item.incomplete === false).length;

  useEffect(() => {
    console.log("Saving:", todo);
    localStorage.setItem("todo-items", JSON.stringify(todo));
  }, [todo]);

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!task) {
      return;
    }

    const obj = {
      id: todo.length + 1,
      title: task,
      incomplete: true
    }

    setTodo([...todo, obj]);
    setTodoBackup([...todo, obj]);
    setTask("");
  }

  function handleClear(event) {
    event.preventDefault();
    setTodo([]);
    setTask("");
  }

  function handleOops(event) {
    event.preventDefault();
    setTodo(todoBackup);
    setTask("");
  }

  function onSelectRow(id) {
    const updatedTodos = todo.map(
      item => {
        if (item.id === id) {
          item.incomplete = (item.incomplete === false);
          return item;
        }
        return item;
      }
    );
    setTodo(updatedTodos);
    setTodoBackup(updatedTodos);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>{incompleteCount} / {todo.length}</h1>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={handleChange}/>
            <button className="button" onClick={handleSubmit}>LISÄÄ</button>
          </form>
        </div>
        <div className="list">
          {todo.map((item, index) => <Row key={index} item={item} onSelectRow={onSelectRow}/>)}
        </div>
        {todo.length > 0 &&
          <div className="options">
            <button className="clear" onClick={handleClear}>TYHJENNÄ LISTA</button>
          </div>
        }
        {todo.length === 0 && todoBackup.length > 0 &&
          <div className="options">
            <button className="clear" onClick={handleOops}>PERUUTA TYHJENNYS!!!</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
