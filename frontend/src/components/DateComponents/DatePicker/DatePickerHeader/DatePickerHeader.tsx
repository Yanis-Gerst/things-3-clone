import React from "react";
import Image from "next/image";
import DateButton from "@/components/DateComponents/DateButton/DateButton";
import todayIcon from "../../../../../public/assets/Header-Today-Dark@2x 1.png";
import moonIcon from "../../../../../public/assets/moonIcon.svg?url";

const DatePickerHeader = () => {
  const currentDate = new Date();
  return (
    <div className="flex flex-col gap-1 mt-1">
      <DateButton submitDateValue={currentDate}>
        <Image src={todayIcon} alt="Today" width={16} height={16} />{" "}
        Aujourd&apos;hui
      </DateButton>

      <DateButton submitDateValue={currentDate}>
        <Image src={moonIcon} alt="Today" width={16} height={16} /> Ce soir
      </DateButton>
    </div>
  );
};

export default DatePickerHeader;
