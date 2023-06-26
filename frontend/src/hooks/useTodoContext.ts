import { TodoContext } from "@/components/Todo/Todo";
import { useContext } from "react";

export const useTodoContext = () => {
  const todo = useContext(TodoContext);
  return todo;
};
