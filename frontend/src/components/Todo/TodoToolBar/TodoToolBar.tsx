import React from "react";
import { IDatePickerConfig } from "@/components/DateComponents/DatePicker/DatePicker";
import ToDoDateSetter from "@/features/ToDoDateSetter";
import DeadlineSetter from "@/features/DeadlineSetter";

type IToolBarConfig = {
  icon: any;
  todoField: keyof Todos;
  alt: string;
  datePickerConfig: IDatePickerConfig;
};

// 1: Config Variable and export it
// 2: Premade Component
// 3: Config Component and put premade compoennt in it
const TodoToolBar = () => {
  const todoSetterStyle = "hover:outline hover:outline-stroke rounded";
  return (
    <div className="w-fit flex gap-4">
      <ToDoDateSetter className={todoSetterStyle} />
      <DeadlineSetter className={todoSetterStyle} />
    </div>
  );
};

export default TodoToolBar;
