import {
  addDaysToDate,
  addMonthToDate,
  getDayOf,
  getDaysOfMonth,
  numberToArray,
} from "@/utils/Date/date";
import React, { useEffect, useRef, useState } from "react";
import { daysName, monthNames } from "../DatePicker/data";
import Image from "next/image";
import starIcon from "../../../../public/assets/startIcon.svg?url";
import DayInterval from "@/components/DateComponents/DayInterval/DayInterval";
import Day from "./Day/Day";

interface Props {
  displayDay?: boolean;
  nextDayToDisplay: number | "all";
  todayIcon?: boolean;
}

let timeoutId: NodeJS.Timeout;

const Calendar: React.FC<Props> = ({
  displayDay = true,
  nextDayToDisplay,
  todayIcon = false,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [monthToDisplay, setMonthToDisplay] = useState(3);
  const calendarRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date();
  const numberOfRemainingMonth = 11 - currentDate.getMonth();
  const daysLeftInCurrentMonth =
    getDaysOfMonth(currentDate.getFullYear(), currentDate.getMonth()) -
    currentDate.getDate();

  const handleScroll = () => {
    clearTimeout(timeoutId);
    if (!isScrolling) {
      setIsScrolling(true);
    }

    timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  };

  useEffect(() => {
    if (!calendarRef.current) return;
    const calendarElement = calendarRef.current;
    const childOfLastMonth = calendarElement.children.item(
      calendarElement.children.length - 60
    );
    if (!childOfLastMonth) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setMonthToDisplay(monthToDisplay + 3);
      },
      {
        threshold: 1,
      }
    );
    observer.observe(childOfLastMonth);

    return () => {
      observer.unobserve(childOfLastMonth);
    };
  }, [monthToDisplay]);

  return (
    <>
      <div className="my-2 px-1">
        <div className="flex w-full justify-between pb-2">
          {displayDay &&
            daysName.map((dayName, index) => (
              <Day key={`${dayName}-${index}`} dayName={dayName} />
            ))}
        </div>
        <div
          ref={calendarRef}
          className="grid-cols-[repeat(7,_1fr)] grid grid-rows-[repeat(5,_1fr)] place-items-center max-h-[200px] overflow-scroll no-scrollbar relative"
          onScroll={handleScroll}
        >
          {todayIcon && (
            <div
              style={{
                gridColumnStart: getDayOf(currentDate),
              }}
            >
              {" "}
              <Image src={starIcon} alt="Today" width={16} height={16} />
            </div>
          )}

          <DayInterval
            start={todayIcon ? addDaysToDate(currentDate, 1) : currentDate}
            end={
              typeof nextDayToDisplay === "number"
                ? addDaysToDate(currentDate, nextDayToDisplay)
                : addDaysToDate(currentDate, daysLeftInCurrentMonth)
            }
            border={nextDayToDisplay === "all"}
          />

          {nextDayToDisplay === "all" &&
            numberToArray(monthToDisplay).map((value, index) => {
              const startOfMonth = addMonthToDate(currentDate, index + 1, 1);
              const lastDayOfMonth = addMonthToDate(currentDate, index + 1);

              return (
                <DayInterval
                  key={index}
                  start={startOfMonth}
                  end={lastDayOfMonth}
                  border={nextDayToDisplay === "all"}
                  labelOnScroll={`${monthNames[startOfMonth.getMonth()]} ${
                    index >= numberOfRemainingMonth
                      ? startOfMonth.getFullYear()
                      : ""
                  }`}
                  isScrolling={isScrolling}
                  displayStartMonth={true}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
