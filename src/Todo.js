import React from "react";

export default function Todo({ todo, toggleTodo }) {
  const onChangeHandler = () => {
    console.log("click");
    toggleTodo(todo.id);
  };
  const ShowTodo = () => {
    if (todo.complete) {
      return (
        // <div className="complete">
        <tr style={{ color: "grey" }}>
          <td>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={onChangeHandler}
            />
          </td>
          <td> {todo.text}</td>
        </tr>
        // </div>
      );
    } else {
      return (
        <tr>
          <td>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={onChangeHandler}
            />
          </td>
          <td> {todo.text}</td>
        </tr>
      );
    }
  };
  return ShowTodo();
}
