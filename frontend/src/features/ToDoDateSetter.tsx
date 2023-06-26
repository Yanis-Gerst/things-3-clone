import DatePickerInput from "@/components/DateComponents/DatePickerInput/DatePickerInput";
import React from "react";
import calendarIcon from "../../public/assets/TaskDetailsCalendar.svg?url";
import Setter from "./Setter";

interface Props {
  className?: string;
}

const ToDoDateSetter = ({ className = "" }) => {
  return (
    <Setter
      icon={calendarIcon}
      alt="Set when you want to do the task"
      className={className}
      todoField="toDoAt"
      config={{ nextDaysToDisplay: 23, todayIcon: true }}
    />
  );
};

export default ToDoDateSetter;
