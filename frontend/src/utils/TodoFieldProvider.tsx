import React, { createContext } from "react";

export const TodoFieldContext = createContext<keyof Todos>("toDoAt");

interface Props {
  children: React.ReactNode;
  value: keyof Todos;
}
const TodoFieldProvider: React.FC<Props> = ({ children, value }) => {
  return (
    <TodoFieldContext.Provider value={value}>
      {children}
    </TodoFieldContext.Provider>
  );
};

export default TodoFieldProvider;
