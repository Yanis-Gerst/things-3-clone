import React, { Children, forwardRef } from "react";
import { useFunctionContext } from "@/utils/FunctionContextProvider";

interface Props {
  submitDateValue?: Date;
  children: React.ReactNode;
  center?: boolean;
  specificStyle?: string;
}
const DateButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, submitDateValue, center = false, specificStyle = "" }, ref) => {
    const toUpdate = useFunctionContext();

    if (!toUpdate)
      throw Error(
        `Provide a functionContext toUpdate data with the component DateButton`
      );

    const submit = () => {
      if (!submitDateValue) return;
      toUpdate(submitDateValue);
    };

    return (
      <button
        onClick={submit}
        className={`flex gap-2 items-center font-bold   hover:bg-primary w-full rounded text-sm ${
          center ? "justify-center" : ""
        } ${
          Children.toArray(children).length === 1 ? "p-[6px]" : "px-2"
        } ${specificStyle}`}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

DateButton.displayName = "DateButton";

export default DateButton;
