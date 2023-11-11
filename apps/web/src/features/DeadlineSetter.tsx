import DatePickerInput from "@/components/DateComponents/DatePickerInput/DatePickerInput";
import Image from "next/image";
import React from "react";
import deadlineIcon from "../../public/assets/TaskDetailsDeadline.svg?url";
import Setter from "./Setter";

const DeadlineSetter = ({ className = "" }) => {
  return (
    <Setter
      todoField="deadlineAt"
      config={{
        nextDaysToDisplay: "all",
        showFooter: false,
        showHeader: false,
        displayDay: true,
      }}
      icon={deadlineIcon}
      className={className}
      alt="Set your deadline"
    />
  );
};

export default DeadlineSetter;
