import { IDatePickerConfig } from "@/components/DateComponents/DatePicker/DatePicker";
import DatePickerInput from "@/components/DateComponents/DatePickerInput/DatePickerInput";
import { useUpdateTodo } from "@/hooks/CRUD/useUpdateTodo";
import { useTodoContext } from "@/hooks/useTodoContext";
import Image from "next/image";
import React from "react";

interface Props {
  icon: any;
  alt: string;
  className?: string;
  config: Omit<IDatePickerConfig, "toUpdate">;
  todoField: keyof Todos;
}

const Setter = ({ icon, alt, className = "", config, todoField }: Props) => {
  const updater = useUpdateTodo();
  const todo = useTodoContext() as Todos;
  const toUpdateContructor = (todoField: keyof Todos) => {
    return (updatedData: Date) => {
      updater({
        ...todo,
        [todoField]: updatedData,
      });
    };
  };

  return (
    <DatePickerInput
      todoField={todoField}
      config={{ ...config, toUpdate: toUpdateContructor(todoField) }}
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
