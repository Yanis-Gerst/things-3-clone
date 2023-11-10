import { emptyTodo } from "@/components/DateComponents/DatePicker/data";
import Todo from "@/components/Todo/Todo";
import TodoList from "@/components/TodoList/TodoList";
import { useAddTodo } from "@/hooks/CRUD/useAddTodo";
import { useUserIdContext } from "@/hooks/useUserIdContext";
import React, { useEffect } from "react";

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
