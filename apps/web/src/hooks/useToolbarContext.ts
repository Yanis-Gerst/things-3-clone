import { SetterTolbarContext, ToolbarContext } from "@/utils/ToolbarProvider";
import { useContext } from "react";

export const useToolbarContext = () => {
  return useContext(ToolbarContext);
};

export const useSetterToolbarContext = () => useContext(SetterTolbarContext);
