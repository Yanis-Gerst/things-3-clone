import { createContext, useContext } from "react";
import React from "react";
const FunctionContext = createContext<Function | null>(null);
export const useFunctionContext = () => {
  return useContext(FunctionContext);
};

interface Props {
  children: React.ReactNode;
  value: Function;
}

const FunctionContextProvider = ({ value, children }: Props) => {
  return (
    <FunctionContext.Provider value={value}>
      {children}
    </FunctionContext.Provider>
  );
};

export default FunctionContextProvider;
