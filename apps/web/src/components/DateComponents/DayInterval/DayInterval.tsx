import {
  addDaysToDate,
  getDaysLeftOfWeek,
  getMonthShortcut,
  getNumberOfDaysBeetween,
  numberToArray,
} from "@/utils/Date/date";
import React, { useLayoutEffect, useRef } from "react";
import DateButton from "../DateButton/DateButton";
import { monthNames } from "../DatePicker/data";
import { isFirtElement, isLastElement } from "@/utils/array";

interface Props {
  start: Date;
  end: Date;
  border?: boolean;
  labelOnScroll?: string;
  isScrolling?: boolean;
  displayStartMonth?: boolean;
}

const DayInterval: React.FC<Props> = ({
  start,
  end,
  border = false,
  labelOnScroll,
  isScrolling,
  displayStartMonth = false,
}) => {
  const centerRef = useRef<number | null>(null);

  const numberOfDateToDisplay = getNumberOfDaysBeetween(start, end) + 1;
  const numberOfDaysInFirstWeek = getDaysLeftOfWeek(start);

  if (numberOfDateToDisplay <= 0) {
    throw Error("Date Interval must be at least zero day apart");
  }

  const dayToDisplayArray = numberToArray(numberOfDateToDisplay);
  const firstElemRef = useRef<HTMLButtonElement>(null);
  const lastElemRef = useRef<HTMLButtonElement>(null);
  const monthElemRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!lastElemRef.current || !firstElemRef.current) return;
    const top = firstElemRef.current.offsetTop;
    const bottom = lastElemRef.current.offsetTop;
    centerRef.current = (bottom + top) / 2;
  }, []);
  return (
    <>
      {dayToDisplayArray.map((value, index) => {
        const date = addDaysToDate(start, index);

        return (
          <React.Fragment key={date.getTime()}>
            <DateButton
              submitDateValue={date}
              center
              ref={
                isFirtElement(index)
                  ? firstElemRef
                  : isLastElement(dayToDisplayArray, index)
                  ? lastElemRef
                  : null
              }
              specificStyle={
                isLastWeek(dayToDisplayArray, index) && border
                  ? `relative after:content[''] after:h-px after:w-full after:absolute after:bottom-0 after:bg-tertiaryContent ${
                      isLastElement(dayToDisplayArray, index) &&
                      !isLastDayOfTheWeek(numberOfDaysInFirstWeek, index)
                        ? "before:absolute before:right-0 before:h-full before:translate-y-[-1px] before:w-px before:content[''] before:bg-tertiaryContent"
                        : ""
                    }`
                  : ""
              }
            >
              <>
                {isFirtElement(index) && displayStartMonth ? (
                  <>
                    <span className="flex flex-col leading-3 text-[10px] w-min font-bold absolute">
                      <p>
                        {getMonthShortcut(
                          monthNames[date.getMonth()],
                        ).toLowerCase()}
                      </p>{" "}
                      <p>{date.getDate()}</p>
                    </span>
                    <p className="opacity-0">{date.getDate()}</p>
                  </>
                ) : (
                  <p>{date.getDate()}</p>
                )}
              </>
            </DateButton>

            {labelOnScroll && (
              <p
                className={`absolute font-bold mx-auto scroll-gradient px-6 rounded transition-all pointer-events-none ${
                  isScrolling ? "opacity-1" : "opacity-0"
                }`}
                style={{ top: `${centerRef.current}px` }}
                ref={monthElemRef}
                key={`${labelOnScroll}-${index}`}
              >
                {labelOnScroll}
              </p>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const isLastWeek = (arr: any[], index: number) => {
  return arr.length - index <= 7;
};

const isLastDayOfTheWeek = (numberOfDaysInFirstWeek: number, index: number) => {
  return (index - numberOfDaysInFirstWeek) % 7 === 0;
};

export default DayInterval;
