import TodoList from "@/components/TodoList/TodoList";
import { getTodoOfDate } from "@/utils/Date/date";
import React from "react";

interface Props {
  todos: Todos[];
  newTodo: boolean;
}

const TodayPage: React.FC<Props> = ({ todos, newTodo }) => {
  const currentDate = new Date();
  return (
    <>
      {<TodoList todos={getTodoOfDate(currentDate, todos)} isNew={newTodo} />}
    </>
  );
};

export default TodayPage;
