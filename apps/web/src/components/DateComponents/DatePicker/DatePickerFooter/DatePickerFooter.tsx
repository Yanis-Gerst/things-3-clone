import React from "react";
import DateButton from "../../DateButton/DateButton";
import Image from "next/image";
import someDayIcon from "../../../../../public/assets/Header-Someday@2x 1.png";
import { useFunctionContext } from "@/utils/FunctionContextProvider";

const DatePickerFooter = () => {
  const toUpdate = useFunctionContext() as Function;
  return (
    <div className="mb-1">
      <DateButton>
        <Image
          src={someDayIcon}
          alt="some day setter"
          width={16}
          height={16}
          onClick={() => {
            toUpdate(new Date());
          }}
        />{" "}
        Some Day
      </DateButton>
    </div>
  );
};

export default DatePickerFooter;
