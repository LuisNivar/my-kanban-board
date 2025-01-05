import {
  GoPlus as AddIcon,
  GoHome as HomeIcon,
  GoGear as SettingIcon,
} from "react-icons/go";
import { IoBriefcaseOutline as WorkIcon } from "react-icons/io5";
import { Link, LinkProps, useLocation } from "react-router-dom";
import Tooltip from "./UI/Tooltip";

export function Sidebar() {
  return (
    <div className="flex justify-between text-[22px] text-neutral-400 flex-col items-center gap-3 py-3 px-2 rounded-lg h-screen bg-neutral-800">
      <nav className="flex flex-col items-center gap-3">
        <Link
          to={"/"}
          className="cursor-pointer select-none bg-yellow-500 hover:bg-yellow-300 transition-colors text-xs font-medium text-neutral-800 px-2 py-1 rounded-md"
        >
          WIP
        </Link>
        <Separator />

        <LinkItem to={"/board/home"} icon={<HomeIcon />} name="home" />
        <LinkItem to={"/board/work"} icon={<WorkIcon />} name="work" />
        <AddButtonItem />
      </nav>

      <div className="flex flex-col">
        <Separator />
        <SettingsItem />
      </div>
    </div>
  );
}

type LinkItemProps = LinkProps & {
  icon: React.ReactNode;
  name: string;
};

function LinkItem({ icon, name, ...props }: LinkItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname.includes(name);

  return (
    <Tooltip text={name}>
      <Link
        {...props}
        className={`transition-colors rounded-lg p-2.5 ${
          isActive
            ? "text-neutral-100 bg-teal-700 hover:bg-teal-600"
            : "text-neutral-400  hover:bg-neutral-700/60"
        }  `}
      >
        {icon}
      </Link>
    </Tooltip>
  );
}

function AddButtonItem() {
  return (
    <Tooltip text="Add new board">
      <button className=" text-lg transition-colors border hover:bg-neutral-300 hover:border-neutral-300 hover:text-neutral-800 border-neutral-600 rounded-md mt-2 p-0.5">
        <AddIcon />
      </button>
    </Tooltip>
  );
}

function SettingsItem() {
  return (
    <Tooltip text="Settings">
      <Link
        to={"/settings"}
        className="group transition-colors hover:rotate-180 hover:bg-neutral-700/60 rounded-lg p-2.5"
      >
        <SettingIcon className="transition-transform group-hover:rotate-45" />
      </Link>
    </Tooltip>
  );
}

function Separator() {
  return (
    <span className="block w-full h-[1px] bg-neutral-700 mb-2 rounded-lg" />
  );
}
