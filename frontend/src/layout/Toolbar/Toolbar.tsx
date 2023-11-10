import React, { useContext } from "react";
import Image from "next/image";
import toolBarAddIcon from "../../../public/assets/toolBarAddIcon.svg?url";
import toolBarMoveIcon from "../../../public/assets/ToolBarMoveIcon.svg?url";
import toolBarSearchIcon from "../../../public/assets/ToolBarSearchIcon.svg?url";
import { useToolbarContext } from "@/hooks/useToolbarContext";
import { IToolbarContext } from "@/utils/ToolbarProvider";
import { useUserIdContext } from "@/hooks/useUserIdContext";
import { useAddTodo } from "../../hooks/CRUD/useAddTodo";
import ToolBarItem, { IToolConfig } from "./ToolBarItem/ToolBarItem";
import trashIcon from "../../../public/assets/Trash.svg?url";
import ToDoDateSetter from "@/features/ToDoDateSetter";
import DeadlineSetter from "@/features/DeadlineSetter";
import { TodoContext } from "@/components/Todo/Todo";
import { emptyTodo } from "@/components/DateComponents/DatePicker/data";

const isUndefinedOrNull = (elt: any) => {
  return elt === undefined || elt === null;
};

const Toolbar = () => {
  const toolbarState = useToolbarContext() as IToolbarContext;
  const userId = useUserIdContext();
  const adder = useAddTodo();

  const toolsConfig: IToolConfig[] = [
    {
      icon: toolBarAddIcon,
      onClick: () => {
        adder(emptyTodo(userId));
      },
      onDisable: () => {
        return !toolbarState.layout.includes("base-todo");
      },
      id: "add",
    },
    {
      onDisable: () => {
        return isUndefinedOrNull(toolbarState.focusedTodo);
      },
      SetterComponent: ToDoDateSetter,
      id: "todoSet",
    },
    {
      onDisable: () => {
        return isUndefinedOrNull(toolbarState.focusedTodo);
      },
      SetterComponent: DeadlineSetter,
      id: "moveSet",
    },
    {
      icon: toolBarSearchIcon,
      id: "search",
    },
  ];

  const toolsDetailConfig: IToolConfig[] = [
    {
      icon: toolBarMoveIcon,
      id: "moveSet",
    },
    {
      icon: trashIcon,
      id: "trash",
    },
  ];

  const showToolbarTodoDetails = toolbarState.layout.includes("details");
  return (
    <footer className="w-full  border-t border-black p-1 relative">
      <div
        className="flex justify-between w-1/2
     mx-auto"
      >
        <TodoContext.Provider
          value={toolbarState.focusedTodo ? toolbarState.focusedTodo : null}
        >
          {toolsConfig.map((toolConfig) => {
            return (
              <ToolBarItem
                key={toolConfig.id}
                toolConfig={toolConfig}
                showToolbarTodoDetails={showToolbarTodoDetails}
              />
            );
          })}
        </TodoContext.Provider>
      </div>

      <div
        className={`flex justify-between w-1/2
     mx-auto absolute inset-0  transition-transform duration-150 p-1 ${
       showToolbarTodoDetails
         ? " translate-y-0 delay-150"
         : "delay-0 translate-y-full"
     }`}
      >
        {toolsDetailConfig.map((toolConfig) => {
          return (
            <div
              key={toolConfig.icon.src}
              className={`w-full h-full grid place-items-center rounded hover:outline hover:outline-stroke py-2`}
              onClick={toolConfig.onClick}
            >
              <Image
                src={toolConfig.icon}
                alt="toolbar"
                width={20}
                height={20}
              />
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Toolbar;
