import clsx from "clsx";
import { Link } from "react-router-dom";
import { DEFAULT_BACKGROUND } from "../Settings/utils";
import { ICON_DICTIONARY } from "../Sidebar/utils";

type BoardsProps = {
  name: string;
  background?: string;
  path: string;
  icon: string;
};

export default function BoardShortCut({
  name,
  background,
  path,
  icon,
}: BoardsProps) {
  return (
    <Link
      className={clsx(
        "group flex-shrink-0 border transition-colors border-neutral-750 hover:border-teal-900 overflow-hidden bg-cover flex flex-col w-56 h-40 justify-end rounded-lg text-neutral-400",
        background ?? DEFAULT_BACKGROUND
      )}
      rel="preload"
      to={path}
    >
      <span className="group-hover:backdrop-blur-[2px] flex items-center text-base gap-2  bg-neutral-900/80 self-start px-3 py-1 w-full group-hover:bg-teal-900/75 group-hover:text-teal-200">
        {ICON_DICTIONARY[icon]}
        {name}
      </span>
    </Link>
  );
}
