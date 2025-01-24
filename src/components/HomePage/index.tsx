import { Link } from "react-router-dom";
import { DEFAULT_BACKGROUND } from "../Settings/utils";
import { ICON_DICTIONARY } from "../Sidebar/utils";
import clsx from "clsx";
import { useContext } from "react";
import { SidebarContext } from "../../Context";

type BoardsProps = {
  name: string;
  background?: string;
  path: string;
  icon: string;
};
function BoardShortcut({ name, background, path, icon }: BoardsProps) {
  return (
    <Link
      className={clsx(
        "group flex-shrink-0 overflow-hidden bg-cover flex flex-col w-56 h-40 justify-end rounded-lg text-neutral-400",
        background ?? DEFAULT_BACKGROUND
      )}
      rel="preload"
      to={path}
    >
      <span className="flex items-center text-base gap-2 transition-colors bg-neutral-900/80 self-start px-3 py-1 w-full group-hover:bg-teal-500/20 group-hover:text-teal-300">
        {ICON_DICTIONARY[icon]}
        {name}
      </span>
    </Link>
  );
}

export default function HomeContent() {
  const sidebar = useContext(SidebarContext);
  return (
    <div className="w-fit max-w-[900px] rounded-lg text-base flex flex-col gap-2 p-5 bg-neutral-750">
      <h3 className="text-lg">My Boards</h3>
      <div className="flex gap-2 overflow-x-auto">
        {sidebar.map((board) => {
          const { background, name, path, icon } = board;
          return (
            <BoardShortcut
              background={background}
              name={name}
              path={path}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
}
