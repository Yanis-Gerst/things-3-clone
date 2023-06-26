import React, { createContext, useLayoutEffect, useRef, useState } from "react";
import DatePickerHeader from "./DatePickerHeader/DatePickerHeader";
import DatePickerFooter from "./DatePickerFooter/DatePickerFooter";
import Calendar from "../Calendar/Calendar";

export type IDatePickerConfig = {
  showHeader?: boolean;
  showFooter?: boolean;
  displayDay?: boolean;
  nextDaysToDisplay: number | "all";
  todayIcon?: boolean;
};

interface Props {
  config: IDatePickerConfig;
}

const isOverflowRight = (elem: HTMLElement | null) => {
  if (!elem) return false;
  return (
    elem.getBoundingClientRect().right >
    document.body.getBoundingClientRect().right
  );
};

const isOverflowBottom = (elem: HTMLElement | null) => {
  if (!elem) return false;
  return (
    elem.getBoundingClientRect().bottom >
    document.body.getBoundingClientRect().bottom
  );
};
const DatePicker: React.FC<Props> = ({ config }) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [overflowRight, setIsOverflowRight] = useState(false);
  const [overflowBottom, setIsOverflowBottom] = useState(false);

  useLayoutEffect(() => {
    setIsOverflowBottom(isOverflowBottom(datePickerRef.current));
    setIsOverflowRight(isOverflowRight(datePickerRef.current));
  }, []);

  return (
    <div
      className={`w-max bg-[#2C3137] border border-[#3D4147] absolute py-1 px-2 rounded shadow-base ${
        overflowRight ? "right-0" : "-translate-x-1/2 "
      } ${overflowBottom ? "-top-3 -translate-y-full" : ""}`}
      ref={datePickerRef}
    >
      {(config.showHeader || config.showHeader) === undefined && (
        <DatePickerHeader />
      )}
      <Calendar
        nextDayToDisplay={config.nextDaysToDisplay}
        displayDay={config.displayDay === undefined ? true : config.displayDay}
        todayIcon={config.todayIcon}
      />
      {(config.showFooter || config.showFooter === undefined) && (
        <DatePickerFooter />
      )}
    </div>
  );
};

export default DatePicker;
