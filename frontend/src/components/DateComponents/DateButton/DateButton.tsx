import { updateTodo } from "@/api/fetch";
import { useTodoContext } from "@/hooks/useTodoContext";
import { useUpdateTodo } from "@/hooks/CRUD/useUpdateTodo";
import { TodoFieldContext } from "@/utils/TodoFieldProvider";
import React, { Children, forwardRef, useContext } from "react";

interface Props {
  submitDateValue?: Date;
  children: React.ReactNode;
  center?: boolean;
  specifiqStyle?: string;
}
const DateButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, submitDateValue, center = false, specifiqStyle = "" }, ref) => {
    const todoField = useContext(TodoFieldContext);
    const todo = useTodoContext();
    if (!todoField || !todo)
      throw Error(
        `Provide TodoField or todo context for DateInput todoField: ${todoField}, todo: ${todo} `
      );

    const updater = useUpdateTodo();

    const submit = () => {
      if (!submitDateValue) return;
      updater({
        ...todo,
        [todoField]: submitDateValue,
      });
    };

    return (
      <button
        onClick={submit}
        className={`flex gap-2 items-center font-bold   hover:bg-primary w-full rounded text-sm ${
          center ? "justify-center" : ""
        } ${
          Children.toArray(children).length === 1 ? "p-[6px]" : "px-2"
        } ${specifiqStyle}`}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

DateButton.displayName = "DateButton";

export default DateButton;
