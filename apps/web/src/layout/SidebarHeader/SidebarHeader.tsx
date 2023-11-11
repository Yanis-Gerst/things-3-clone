import React from "react";
import Image from "next/image";
import { headerIconConfigs } from "@/headerIconConfig";
import { getTodoOfDate } from "@/utils/Date/date";
import { useRetrieveUser } from "@/hooks/CRUD/useRetrieveUser";

interface Props {
  activeTab: number;
  setActiveTab: React.Dispatch<number>;
}
const SidebarHeader = ({ activeTab, setActiveTab }: Props) => {
  const currentDate = new Date();
  const user = useRetrieveUser();
  const todayTodos = getTodoOfDate(currentDate, user.todos);
  return (
    <header>
      <nav>
        <ul>
          {headerIconConfigs.map((headerIconConfig, index) => {
            return (
              <li
                className={`flex items-center px-2 py-[2px] rounded cursor-default  ${
                  headerIconConfig.bottomSpace == true ? "mb-4" : ""
                } ${index === activeTab ? "bg-accentHeader" : ""}`}
                key={headerIconConfig.icon.src}
                onClick={() => setActiveTab(index)}
              >
                <Image
                  src={headerIconConfig.icon}
                  alt="inbox icon"
                  className="mr-[6px]"
                  width={16}
                  height={16}
                />
                <p className="text-secondaryContent text-sm font-bold">
                  {headerIconConfig.content}
                </p>
                <p className="ml-auto text-tertiaryContent font-bold text-sm">
                  {index === 0 && user.todos.length}
                  {index === 1 && todayTodos.length > 0
                    ? todayTodos.length
                    : ""}
                </p>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default SidebarHeader;
