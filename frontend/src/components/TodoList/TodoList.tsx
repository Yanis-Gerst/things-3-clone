import React from "react";
import Todo from "../Todo/Todo";

interface Props {
  todos: Todos[];
  isNew?: boolean;
}
const TodoList: React.FC<Props> = ({ todos, isNew = false }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Todo
          todo={todo}
          key={todo._id}
          isNew={index === todos.length - 1 && isNew ? true : false}
        />
      ))}
    </>
  );
};

export default TodoList;
