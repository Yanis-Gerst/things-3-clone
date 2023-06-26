import { headerIconConfigs } from "@/headerIconConfig";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useEffectAfterInitRender } from "@/hooks/useEffectAfiterInitRender";
import Toolbar from "../Toolbar/Toolbar";

interface Props {
  index: number;
  todos: Todos[];
}
const MainSection = ({ index, todos }: Props) => {
  const headerConfig = headerIconConfigs[index];
  const [newTodo, setNewTodo] = useState(false);
  const prevTodoLength = useRef<number>(todos.length);
  useEffectAfterInitRender(() => {
    setNewTodo(todos.length > prevTodoLength.current);
    prevTodoLength.current = todos.length;
  }, [setNewTodo, todos.length]);

  return (
    <section className="bg-main w-5/6 border-l border-black border-solid min-h-screen flex flex-col">
      <div className="pt-20 px-[5.5rem] w-full grow" id="main-section">
        <h1 className="flex gap-2 items-center text-2xl mb-8 font-bold ml-1">
          <Image
            src={headerConfig.icon}
            alt="inbox Icon"
            width={24}
            height={24}
          />{" "}
          {headerConfig.content}
        </h1>

        <section className="flex flex-col  -ml-1">
          {headerConfig.MainComponent && (
            <headerConfig.MainComponent todos={todos} newTodo={newTodo} />
          )}
        </section>
      </div>
      <Toolbar />
    </section>
  );
};

export default MainSection;
