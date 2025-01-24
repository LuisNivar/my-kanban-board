import { Link } from "react-router-dom";
import { DEFAULT_BACKGROUND } from "../Settings/utils";
import clsx from "clsx";
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
