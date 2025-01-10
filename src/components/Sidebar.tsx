import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import {
  GoPlus as AddIcon,
  GoRepo as BookIcon,
  GoCalendar as CalendarIcon,
  GoCodeSquare as CodeIcon,
  GoDatabase as DataBaseIcon,
  GoFileDirectory as FolderIcon,
  GoHeart as HeartIcon,
  GoGear as SettingIcon,
  GoStar as StarIcon,
} from "react-icons/go";
import { PiHammer as HammerIcon } from "react-icons/pi";
import { VscGame as GameIcon } from "react-icons/vsc";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { SidebarContext } from "../Context";
import { SidebarProvider } from "../SidebarProvider";
import { BoardDialog } from "./BoardDialog";
import Tooltip from "./UI/Tooltip";
import { GoHome as HomeIcon } from "react-icons/go";
import { IoBriefcaseOutline as WorkIcon } from "react-icons/io5";
import {
  GoPackage as BoxIcon,
  GoPin as PinIcon,
  GoTrophy as TrophyIcon,
} from "react-icons/go";

export function Sidebar() {
  return (
    <SidebarProvider>
      <div className="flex justify-between text-[22px] text-neutral-400 flex-col items-center gap-3 py-3 px-2 rounded-lg h-screen bg-neutral-800">
        <nav className="flex flex-col items-center gap-3">
          <Link
            to={"/"}
            className="cursor-pointer select-none bg-yellow-500 hover:bg-yellow-300 transition-colors text-xs font-medium text-neutral-800 px-2 py-1 rounded-md"
          >
            WIP
          </Link>
          <Separator />

          <SidebarBody />

          <AddButtonItem />
        </nav>

        <div className="flex flex-col">
          <Separator />
          <SettingsItem />
        </div>
      </div>
    </SidebarProvider>
  );
}

const ICON_DICTIONARY: { [key: string]: React.ReactNode } = {
  ["home"]: <HomeIcon />,
  ["work"]: <WorkIcon />,
  ["code"]: <CodeIcon />,
  ["book"]: <BookIcon />,
  ["game"]: <GameIcon />,
  ["heart"]: <HeartIcon />,
  ["star"]: <StarIcon />,
  ["hammer"]: <HammerIcon />,
  ["calendar"]: <CalendarIcon />,
  ["db"]: <DataBaseIcon />,
  ["folder"]: <FolderIcon />,
  ["pin"]: <PinIcon />,
  ["trophy"]: <TrophyIcon />,
  ["box"]: <BoxIcon />,
};

type LinkItemProps = LinkProps & {
  icon: string;
  name: string;
};

function LinkItem({ icon, name, ...props }: LinkItemProps) {
  const { pathname } = useLocation();
  //FIXME:
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
        {ICON_DICTIONARY[icon]}
      </Link>
    </Tooltip>
  );
}

function AddButtonItem() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip text="Add new board">
        <button
          onClick={() => setOpen(true)}
          className=" text-lg transition-colors border hover:bg-neutral-300 hover:border-neutral-300 hover:text-neutral-800 border-neutral-600 rounded-md mt-2 p-0.5"
        >
          <AddIcon />
        </button>
      </Tooltip>
      <BoardDialog open={open} onOpenChange={setOpen} />
    </>
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

function SidebarBody() {
  const state = useContext(SidebarContext);
  return (
    <>
      {state.map((item) => (
        <LinkItem
          key={nanoid()}
          to={item.path}
          icon={item.icon}
          name={item.name}
        />
      ))}
    </>
  );
}
