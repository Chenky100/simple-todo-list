import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  var prevTodos = [];
  var count = 0;
  useEffect(() => {
    count++;
    console.log("!@COUNT@!", count);
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log("len", storedTodos);
    if (localStorage.getItem("todoApp.have_todos")) {
      if (storedTodos && storedTodos.length > 0) {
        // console.log("setting", storedTodos[0]);
        let tmp = [...storedTodos];
        console.log("stored todos", tmp);
        setTodos(tmp);
      }
    } else {
      console.log("no stored todos");
      localStorage.setItem("todoApp.have_todos", JSON.stringify(true));
      let firstTodos = [
        { id: uuidv4(), text: "Add a todo. ", complete: false },
        {
          id: uuidv4(),
          text: "Hit the checkbox of a todo to mark it as done. ",
          complete: false,
        },
        {
          id: uuidv4(),
          text: 'Clear completed todos with the "Clear Complete" button. ',
          complete: false,
        },
        {
          id: uuidv4(),
          text: "Try out the theme button on the top right. ",
          complete: false,
        },
      ];
      setTodos(firstTodos);
    }
  }, []); // useeffect on empty array happens only first time the app loads

  useEffect(() => {
    // saving todos to local storage every time todos changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    let x = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("Saved to localStorage", x);
  }, [todos]);

  const addTodo = () => {
    const name = todoRef.current.value;
    if (name === "") {
      return;
    }
    // console.log(name);
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), text: name, complete: false }];
    });
    todoRef.current.value = null;
  };
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };
  const clearComplete = () => {
    let newTodos = [];
    for (const todo of todos) {
      if (!todo.complete) {
        newTodos.push(todo);
      }
    }
    setTodos(newTodos);
  };
  const changeTheme = () => {
    let theme2 = document.getElementsByClassName("theme2");
    let body = document.body;
    let light = "white";
    let dark = "rgb(54, 54, 54)";
    if (document.body.style.backgroundColor == light) {
      body.style.backgroundColor = dark;

      body.style.color = "white";
      document.getElementById("theme").style.fill = light;

      theme2[0].style.backgroundColor = "rgb(33, 33, 33)";
      theme2[1].style.backgroundColor = "rgb(33, 33, 33)";
    } else {
      body.style.color = "black";
      document.getElementById("theme").style.fill = "black";
      document.body.style.backgroundColor = light;
      theme2[0].style.backgroundColor = "rgb(239, 235, 229)";
      theme2[1].style.backgroundColor = "rgb(239, 235, 229)";
    }
    const el = document.getElementsByClassName("theme2");
    console.log(el);
    let x = document.getElementsByClassName("theme1");
    // document.getElementsByClassName("one").style.backgroundColor;rgb(33, 33, 33)
  };
  const reset = () => {
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    // document.reload();
  };
  return (
    <>
      <div className="one theme2">
        <table id="thead">
          <tr>
            <td id="td1"></td>
            <td id="chead">
              <h1 id="todolisth1">TodoList</h1>
            </td>
            <td id="td3">
              <svg
                onClick={changeTheme}
                // class="theme1"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="theme"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z" />
              </svg>
            </td>
          </tr>
        </table>

        <br />
        <input ref={todoRef} type="text" id="todoInput" />
        <br />

        <button type="button" class="btn btn-success" onClick={addTodo}>
          Add Todo
        </button>
        <button type="button" class="btn btn-secondary" onClick={clearComplete}>
          Clear Complete
        </button>
        <br />
        <br />
        <div className="myTodos">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        {/* <a href="https://youtu.be/hQAHSlTtcmY?t=900">Continue this video</a> */}
      </div>
      <div className="two theme2">
        <br />
        <div> {todos.length} left</div>
      </div>
      <div>{/* <button onClick={reset}> Reset Todos</button> */}</div>
    </>
  );
}

export default App;
