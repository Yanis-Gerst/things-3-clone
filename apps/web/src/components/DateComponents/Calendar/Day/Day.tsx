import React from "react";
import { daysName } from "../../DatePicker/data";

interface Props {
  dayName: (typeof daysName)[number];
}

const Day = ({ dayName }: Props) => {
  return (
    <p className="text-xs font-bold text-secondaryContent">
      {dayName.substring(0, 3).toLowerCase()}.
    </p>
  );
};

export default Day;
