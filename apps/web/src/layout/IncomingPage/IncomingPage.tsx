import {
  daysName,
  monthNames,
} from "@/components/DateComponents/DatePicker/data";
import DayIncoming from "@/components/DateComponents/DayIncoming/DayIncoming";
import Divider from "@/components/Divider";
import MonthIncoming from "@/components/MontIncoming/MonthIncoming";
import { getDaysOfMonth } from "@/utils/Date/date";
import React, { createContext } from "react";

interface Props {
  todos: Todos[];
  newTodo: boolean;
}

const incomingDaysNumberMax = 7;
const incomingMonthNumberMax = 4;

const IncomingPage: React.FC<Props> = ({ todos, newTodo }) => {
  const currentDate = new Date();
  const numberOfDays = getDaysOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  let incomingDays = [...Array(numberOfDays).keys()].slice(
    currentDate.getDate() + 1
  );
  let daysLeft: number[] = [];
  if (incomingDays.length > incomingDaysNumberMax) {
    daysLeft = incomingDays.slice(incomingDaysNumberMax);
    incomingDays = incomingDays.slice(0, incomingDaysNumberMax);
  }

  return (
    <div className="flex flex-col gap-10 w-full pb-20">
      {incomingDays.map((dayNumber) => {
        const dayNumberOfTheWeek =
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            dayNumber
          ).getDay() - 1;

        const day =
          dayNumberOfTheWeek >= 0 ? daysName[dayNumberOfTheWeek] : daysName[6];

        return (
          <DayIncoming
            key={dayNumber}
            day={day}
            dayNumber={dayNumber}
            todos={todos}
          />
        );
      })}
      <MonthIncoming
        nextMonth={currentDate.getMonth()}
        dayInterval={[daysLeft[0], daysLeft[daysLeft.length - 1]]}
        todos={todos}
      />
      {[...Array(incomingMonthNumberMax).keys()].map((value, index) => {
        const nextMonth = (currentDate.getMonth() + index + 1) % 12;
        console.log(nextMonth, monthNames);
        return (
          <MonthIncoming key={nextMonth} nextMonth={nextMonth} todos={todos} />
        );
      })}
    </div>
  );
};

export default IncomingPage;
