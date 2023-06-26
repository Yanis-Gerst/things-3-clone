import React from "react";
import DateButton from "../../DateButton/DateButton";
import Image from "next/image";
import someDayIcon from "../../../../../public/assets/Header-Someday@2x 1.png";

const DatePickerFooter = () => {
  return (
    <div className="mb-1">
      <DateButton>
        <Image src={someDayIcon} alt="Today" width={16} height={16} /> Some Day
      </DateButton>
    </div>
  );
};

export default DatePickerFooter;
