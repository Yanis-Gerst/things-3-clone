import React from "react";
import Divider from "../Divider";
import { monthNames } from "../DateComponents/DatePicker/data";
import TodoList from "../TodoList/TodoList";
import { getTodoOfDayInterval, getTodoOfMonth } from "@/utils/Date/date";

interface Props {
  nextMonth: number;
  dayInterval?: number[];
  todos: Todos[];
}
const MonthIncoming: React.FC<Props> = ({ nextMonth, dayInterval, todos }) => {
  const currentDate = new Date();
  const monthDate = new Date(currentDate.getFullYear(), nextMonth);
  return (
    <div className="w-full flex flex-col gap-1" key={nextMonth}>
      <Divider />
      <span className="flex gap-1 font-bold text-sm">
        <p>{monthNames[nextMonth]}</p>{" "}
        {dayInterval && (
          <p className="text-secondaryContent">
            {dayInterval[0]}-{dayInterval[1]}
          </p>
        )}
      </span>
      <div>
        <TodoList
          todos={
            dayInterval
              ? getTodoOfDayInterval(monthDate, todos, dayInterval)
              : getTodoOfMonth(monthDate, todos)
          }
          isNew={false}
        />
      </div>
    </div>
  );
};

export default MonthIncoming;
