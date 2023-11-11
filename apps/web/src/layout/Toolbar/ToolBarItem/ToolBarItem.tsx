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
      className={`w-full h-full transition-transform duration-150 delay-150  cursor-pointer  ${
        isDisable ? "brightness-50 pointer-events-none" : ""
      }  ${showToolbarTodoDetails ? "translate-y-full delay-0" : "delay-150"} ${
        toolConfig.SetterComponent
          ? ""
          : " grid place-items-center rounded py-1 hover:outline-stroke hover:outline"
      }`}
      onClick={toolConfig.onClick}
    >
      {toolConfig.SetterComponent ? (
        <toolConfig.SetterComponent
          className={
            "hover:outline hover:outline-stroke w-full h-full grid place-items-center rounded py-1"
          }
        />
      ) : (
        <Image
          src={toolConfig.icon}
          alt="toolbar"
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
        />
      )}
    </div>
  );
};

export default ToolBarItem;
