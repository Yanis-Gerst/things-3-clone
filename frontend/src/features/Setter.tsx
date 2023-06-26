import { IDatePickerConfig } from "@/components/DateComponents/DatePicker/DatePicker";
import DatePickerInput from "@/components/DateComponents/DatePickerInput/DatePickerInput";
import Image from "next/image";
import React from "react";

interface Props {
  icon: any;
  alt: string;
  className?: string;
  config: IDatePickerConfig;
  todoField: keyof Todos;
}
const Setter = ({ icon, alt, className = "", config, todoField }: Props) => {
  return (
    <DatePickerInput
      todoField={todoField}
      config={config}
      className={className}
    >
      <Image
        src={icon}
        alt={alt}
        className="pointer-events-none p-1"
        width={24}
        height={24}
      />
    </DatePickerInput>
  );
};

export default Setter;
