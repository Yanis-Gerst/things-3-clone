import React from "react";
import Divider from "../../Divider";
import TodoList from "../../TodoList/TodoList";
import { getTodoOfDate } from "@/utils/Date/date";

interface Props {
  dayNumber: number;
  day: string;
  todos: Todos[];
}

const DayIncoming: React.FC<Props> = ({ dayNumber, day, todos }) => {
  const currentDate = new Date();
  const dateOfThisDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    dayNumber
  );

  return (
    <div>
      <h2 className="flex gap-1 font-bold text-3xl items-center flex-start">
        {dayNumber}
        <p className="flex flex-col gap-1 w-full text-sm text-secondaryContent mt-1 ">
          <Divider /> {day}
        </p>
      </h2>
      <div>
        <TodoList todos={getTodoOfDate(dateOfThisDay, todos)} />
      </div>
    </div>
  );
};

export default DayIncoming;
