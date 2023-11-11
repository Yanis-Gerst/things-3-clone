import SidebarHeader from "@/layout/SidebarHeader/SidebarHeader";
import React from "react";

interface Props {
  activeTabs: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
const Sidebar = ({ activeTabs, setActiveTab }: Props) => {
  return (
    <aside className="bg-sidebar w-[250px] min-h-screen pt-14 pl-3 pr-4 ">
      <SidebarHeader activeTab={activeTabs} setActiveTab={setActiveTab} />
    </aside>
  );
};

export default Sidebar;
