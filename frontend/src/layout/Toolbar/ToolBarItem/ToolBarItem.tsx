import { TodoContext } from "@/components/Todo/Todo";
import Image from "next/image";
import React from "react";

export type IToolConfig = {
  icon?: any;
  SetterComponent?: React.FC<any>;
  onClick?: () => void;
  onDisable?: () => boolean;
  id: string;
};
interface Props {
  toolConfig: IToolConfig;
  showToolbarTodoDetails: boolean;
}

const ToolBarItem = ({ toolConfig, showToolbarTodoDetails }: Props) => {
  const isDisable = toolConfig.onDisable ? toolConfig.onDisable() : false;

  return (
    <div
      key={toolConfig.id}
      className={`w-full h-full grid place-items-center rounded  transition-transform duration-150 delay-150 hover:outline hover:outline-stroke py-2 ${
        isDisable ? "brightness-50" : ""
      }  ${showToolbarTodoDetails ? "translate-y-full delay-0" : "delay-150"}`}
      onClick={toolConfig.onClick}
    >
      {toolConfig.SetterComponent ? (
        <toolConfig.SetterComponent />
      ) : (
        <Image src={toolConfig.icon} alt="toolbar" width={24} height={24} />
      )}
    </div>
  );
};

export default ToolBarItem;
