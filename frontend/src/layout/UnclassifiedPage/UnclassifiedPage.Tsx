import Todo from "@/components/Todo/Todo";
import TodoList from "@/components/TodoList/TodoList";
import React from "react";

interface Props {
  todos: Todos[];
  newTodo: boolean;
}
const UnclassifiedPage: React.FC<Props> = ({ todos, newTodo }) => {
  return (
    <>
      <TodoList todos={todos} isNew={newTodo} />
    </>
  );
};

export default UnclassifiedPage;
