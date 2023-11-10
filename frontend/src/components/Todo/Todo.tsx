import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";
import ContentEditableInput from "../ContentEditableInput/ContentEditableInput";
import CompletedButton from "../CompletedButton/CompletedButton";
import { useSetterToolbarContext } from "@/hooks/useToolbarContext";
import { IToolbarContext } from "@/utils/ToolbarProvider";
import TodoDetails from "./TodoDetails/TodoDetails";
import { useDeleteTodo } from "@/hooks/CRUD/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/CRUD/useUpdateTodo";

interface Props {
  todo: Todos;
  isNew?: boolean;
}
type Test = {
  [key in keyof Todos]: string;
};

export const TodoContext = createContext<Todos | null>(null);

const Todo = ({ todo, isNew }: Props) => {
  const setToolbarState = useSetterToolbarContext() as React.Dispatch<
    React.SetStateAction<IToolbarContext>
  >;
  const [showTodoDetails, setShowTodoDetails] = useState(false);

  const titleInput = useRef<HTMLSpanElement>(null);
  const descriptionsInput = useRef<HTMLSpanElement>(null);
  const todoContainerRef = useRef<HTMLDivElement>(null);

  const deleter = useDeleteTodo();
  const updater = useUpdateTodo();

  const handleUpdate = (updatedData: Partial<Todos>) => {
    const currentField = Object.keys(updatedData)[0] as keyof Todos;
    if (currentField in todo === false)
      throw Error(`Provide field${currentField} is not a key in ${todo}`);
    if (todo[currentField] === updatedData[currentField]) return;
    updater({
      ...todo,
      ...updatedData,
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (e.detail !== 2 || showTodoDetails) return;
    e.preventDefault();
    setShowTodoDetails(true);
  };

  const handleShortcut = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !showTodoDetails) {
      deleter(todo._id);
      setToolbarState((currentState) => ({
        ...currentState,
        focusedTodo: null,
      }));
    }
    if (e.key === "Enter") {
      if (showTodoDetails) {
        blurInputs();
      }
      setShowTodoDetails(!showTodoDetails);
    }
    if (e.key === "Escape") {
      if (!showTodoDetails) return;
      blurInputs();
      setShowTodoDetails(false);
    }
  };

  const blurInputs = () => {
    titleInput.current?.blur();
    descriptionsInput.current?.blur();
  };

  useEffect(() => {
    if (!isNew) return;

    setTimeout(() => {
      setShowTodoDetails(true);
    }, 0);
  }, [isNew]);

  const handleFocus = () => {
    setToolbarState((currentState) => ({
      ...currentState,
      focusedTodo: todo,
    }));
    const mainSectionElement = document.getElementById(
      "main-section"
    ) as HTMLElement;
    mainSectionElement.addEventListener("mousedown", handleBlurOnMouseDown);
  };

  const handleBlurOnMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!todoContainerRef.current || !e.target) return;
      if (isChildrenOfTodoContainer(e.target)) return;

      blurInputs();
      setToolbarState((currentState) => ({
        ...currentState,
        focusedTodo: null,
      }));
      setShowTodoDetails(false);

      const mainSectionElement = document.getElementById("main-section");
      mainSectionElement?.removeEventListener(
        "mousedown",
        handleBlurOnMouseDown
      );
    },

    [setToolbarState]
  );

  useEffect(() => {
    if (showTodoDetails) {
      setToolbarState((currentState) => ({
        ...currentState,
        layout: `${currentState.layout}-details`,
      }));
      setTimeout(() => {
        titleInput.current?.focus();
      }, 10);
    }

    setToolbarState((currentState) => ({
      ...currentState,
      layout: currentState.layout.replace("-details", ""),
    }));
  }, [showTodoDetails, setToolbarState]);

  const isChildrenOfTodoContainer = (target: EventTarget | Node) => {
    return todoContainerRef.current?.contains(target as Node);
  };

  return (
    <div
      className={`${
        showTodoDetails
          ? "bg-accentTodoDetail shadow-base pb-4 my-6 pt-2 pl-2 pr-4"
          : ""
      } rounded transition-all ease-out duration-300`}
      onKeyDown={handleShortcut}
      onFocus={handleFocus}
      onMouseDown={handleDoubleClick}
      ref={todoContainerRef}
    >
      <TodoContext.Provider value={todo}>
        <div
          key={todo._id}
          className={`flex gap-1 items-center p-1 outline-none rounded cursor-default ${
            showTodoDetails ? "" : "focus:bg-accentColor"
          }`}
          tabIndex={0}
        >
          <CompletedButton />
          {showTodoDetails ? (
            <ContentEditableInput
              field="title"
              className="empty:before:content-['New_Task']"
              ref={titleInput}
              toUpdate={handleUpdate}
            >
              {todo.title}
            </ContentEditableInput>
          ) : (
            <p className="empty:before:content-['New_Task'] empty:before:text-secondaryContent">
              {todo.title}
            </p>
          )}
        </div>
        {showTodoDetails && (
          <div className="w-full">
            <ContentEditableInput
              className="ml-7 mb-2 empty:before:content-['Notes'] w-full block"
              field="descriptions"
              ref={descriptionsInput}
              toUpdate={handleUpdate}
            >
              {todo.descriptions}
            </ContentEditableInput>
            <TodoDetails />
          </div>
        )}
      </TodoContext.Provider>
    </div>
  );
};

export default Todo;
