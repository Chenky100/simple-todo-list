import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleTodo }) {
  return todos.map((todo) => {
    return (
      <table>
        <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      </table>
    );
  });
}
