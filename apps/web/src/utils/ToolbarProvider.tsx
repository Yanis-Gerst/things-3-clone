import React, { createContext, useState } from "react";

export interface IToolbarContext {
  layout: string;
  focusedTodo?: Todos | null;
}

export const ToolbarContext = createContext<IToolbarContext | null>(null);
export const SetterTolbarContext = createContext<React.Dispatch<
  React.SetStateAction<IToolbarContext>
> | null>(null);

interface Props {
  children: React.ReactNode;
}

const ToolbarProvider: React.FC<Props> = ({ children }) => {
  const [toolbarState, setToolbarState] = useState<IToolbarContext>({
    layout: "base-todo",
  });

  return (
    <ToolbarContext.Provider value={toolbarState}>
      <SetterTolbarContext.Provider value={setToolbarState}>
        {" "}
        {children}
      </SetterTolbarContext.Provider>
    </ToolbarContext.Provider>
  );
};

export default ToolbarProvider;
