import React from "react";

interface Props {
  children: React.ReactNode;
}
const NumberInput: React.FC<Props> = ({ children }) => {
  return (
    <button className="text-sm font-semibold w-full p-[2px]  grid place-items-center hover:bg-primary rounded">
      {children}
    </button>
  );
};

export default NumberInput;
