import React, { useEffect, useRef, useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import TodoFieldProvider from "@/utils/TodoFieldProvider";
import { IDatePickerConfig } from "../DatePicker/DatePicker";
import { useTodoContext } from "@/hooks/useTodoContext";

interface Props {
  children: React.ReactNode;
  config: IDatePickerConfig;
  todoField: keyof Todos;
  className?: string;
}

const DatePickerInput: React.FC<Props> = ({
  children,
  config,
  todoField,
  className = "",
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerContainerRef = useRef<HTMLInputElement>(null);
  const todo = useTodoContext();

  if (!todo && showDatePicker) setShowDatePicker(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!datePickerContainerRef.current || !e.target) return;
      if (datePickerContainerRef.current.isSameNode(e.target as Node)) {
        setTimeout(() => {
          setShowDatePicker(!showDatePicker);
        }, 0);

        return;
      }
      if (isChildrenOf(datePickerContainerRef.current, e.target)) return;

      setShowDatePicker(false);
    };
    if (!showDatePicker) return;

    window.addEventListener("mouseup", handleMouseDown);

    return () => {
      window.removeEventListener("mouseup", handleMouseDown);
    };
  }, [showDatePicker]);

  return (
    <div
      className={`relative cursor-pointer ${className} ${
        showDatePicker ? "bg-stroke" : ""
      }`}
      onClick={() => {
        if (showDatePicker) return;
        setShowDatePicker(true);
      }}
      ref={datePickerContainerRef}
    >
      <TodoFieldProvider value={todoField}>
        {children}
        {showDatePicker && <DatePicker config={config} />}
      </TodoFieldProvider>
    </div>
  );
};

const isChildrenOf = (parent: HTMLElement, target: EventTarget | Node) => {
  return parent.contains(target as Node);
};

export default DatePickerInput;
