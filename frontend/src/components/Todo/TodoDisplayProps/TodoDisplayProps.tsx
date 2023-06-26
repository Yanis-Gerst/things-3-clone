import React from "react";
import Image from "next/image";
import calendarIcon from "../../../../public/assets/Header-Scheduled-Dark@2x 1.png";
import todayIcon from "../../../../public/assets/Header-Today-Dark@2x 1.png";
import FillDeadlineIcon from "../../../../public/assets/fillDeadlineIcon.svg";
import { daysName, monthNames } from "../../DateComponents/DatePicker/data";
import {
  getDayOf,
  getDayShortcut,
  getNumberOfDaysBeetween,
  isSameDay,
  isSameWeek,
} from "@/utils/Date/date";
import { useTodoContext } from "@/hooks/useTodoContext";

const TodoDisplayProps = () => {
  const todo = useTodoContext() as Todos;
  const toDoAt = new Date(todo.toDoAt);
  const deadline = new Date(todo.deadlineAt);
  const todayDate = new Date();
  const diffDaysDeadLine = getNumberOfDaysBeetween(todayDate, deadline);

  const displayFullDay = (date: Date) => {
    return `${getDayShortcut(
      daysName[getDayOf(date) - 1]
    )} ${date.getDate()}${" "}
    ${monthNames[date.getMonth()]}`;
  };

  const displayDay = () => {
    return `${daysName[getDayOf(toDoAt) - 1]}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Image
          src={isSameDay(toDoAt, todayDate) ? todayIcon : calendarIcon}
          width={16}
          height={16}
          alt="calendar Icon"
          className="w-[16px] h-[16px]"
        />
        <p className="text-sm font-bold">
          {isSameDay(toDoAt, todayDate)
            ? "Today"
            : getNumberOfDaysBeetween(todayDate, toDoAt) <= 5
            ? displayDay()
            : displayFullDay(toDoAt)}{" "}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-[16px] h-[16px]">
          <FillDeadlineIcon
            fill={diffDaysDeadLine !== 0 ? "#ECEBEB" : "#F34D61"}
            stroke={diffDaysDeadLine !== 0 ? "#ECEBEB" : "#F34D61"}
            className="w-full h-full"
          />
        </div>
        <p
          className={`text-sm font-bold ${
            diffDaysDeadLine <= 0 ? "text-deadline" : ""
          }`}
        >
          Deadline: {displayFullDay(deadline)}
        </p>
        <p className="text-sm text-tertiaryContent font-bold">
          {diffDaysDeadLine === 0
            ? "today"
            : diffDaysDeadLine < 0
            ? `${diffDaysDeadLine} days ago`
            : `${diffDaysDeadLine} days left`}
        </p>
      </div>
    </div>
  );
};

export default TodoDisplayProps;
