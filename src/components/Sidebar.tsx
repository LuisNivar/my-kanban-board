import {
  GoPlus as AddIcon,
  GoHome as HomeIcon,
  GoGear as SettingIcon,
} from "react-icons/go";
import { IoBriefcaseOutline as WorkIcon } from "react-icons/io5";
import Tooltip from "./UI/Tooltip";
import { ComponentPropsWithoutRef } from "react";

export function Sidebar() {
  return (
    <nav className="flex justify-between text-[22px] text-neutral-400 flex-col items-center gap-3 py-3 px-2 rounded-lg h-screen bg-neutral-800">
      <div className="flex flex-col items-center gap-3">
        <span className=" cursor-default bg-yellow-500 text-xs font-medium text-neutral-800 px-2 py-1 rounded-md">
          WIP
        </span>
        <Separator />

        <SidebarItem active icon={<HomeIcon />} tooltip="Home Board" />
        <SidebarItem icon={<WorkIcon />} tooltip="Work Board" />

        <Tooltip text="Add new board">
          <button className=" text-lg transition-colors border hover:bg-neutral-300 hover:border-neutral-300 hover:text-neutral-800 border-neutral-600 rounded-md mt-2 p-0.5">
            <AddIcon />
          </button>
        </Tooltip>
      </div>

      <div>
        <Separator />
        <Tooltip text="Settings">
          <button className="group transition-colors hover:rotate-180 hover:bg-neutral-700/60 rounded-lg p-2.5">
            <SettingIcon className="transition-transform group-hover:rotate-45 " />
          </button>
        </Tooltip>
      </div>
    </nav>
  );
}

type SidebarItemProps = ComponentPropsWithoutRef<"button"> & {
  icon: React.ReactNode;
  tooltip: string;
  active?: boolean;
};

function SidebarItem({ icon, tooltip, active, ...props }: SidebarItemProps) {
  return (
    <Tooltip text={tooltip}>
      <button
        {...props}
        className={`transition-colors rounded-lg p-2.5 ${
          active
            ? "text-neutral-100 bg-teal-700 hover:bg-teal-600"
            : "text-neutral-400  hover:bg-neutral-700/60"
        }  `}
      >
        {icon}
      </button>
    </Tooltip>
  );
}

function Separator() {
  return (
    <span className="block w-full h-[1px] bg-neutral-700 mb-2 rounded-lg" />
  );
}
