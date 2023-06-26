import React from "react";
import TodoDisplayProps from "../TodoDisplayProps/TodoDisplayProps";
import TodoToolBar from "../TodoToolBar/TodoToolBar";
const TodoDetails = () => {
  return (
    <div className="w-full flex justify-between items-end mt-8 ml-2">
      <TodoDisplayProps />
      <TodoToolBar />
    </div>
  );
};

export default TodoDetails;
