import clsx from "clsx";
import { MoreIcon } from "../Icons";
import { MenuAction } from "./ColumnMenuAction";
import { headingColor } from "../../types";
import { COLOR_HEADING_DICTIONARY } from "../../utils";

type ColumnHeaderProps = {
  count: number;
  title: string;
  color: headingColor;
  onDelete: () => void;
  onEdit: () => void;
};

export default function ColumnHeader({
  color,
  title,
  count,
  onDelete,
  onEdit,
}: ColumnHeaderProps) {
  return (
    <header className="select-none px-3 py-2 rounded-lg cursor-default shadow-[0_2px_2px] shadow-neutral-900/80  bg-neutral-800  flex items-center justify-between">
      <span className="flex items-center grow justify-center gap-4">
        <h3
          className={clsx("font-medium", COLOR_HEADING_DICTIONARY[color].text)}
        >
          {title}
        </h3>
        <span className="text-center text-sm text-neutral-400">
          {count ?? 0}
        </span>
      </span>
      <MenuAction onDelete={onDelete} onEdit={onEdit}>
        <MoreIcon className="text-lg p-0.5 rounded hover:bg-neutral-600 text-neutral-600 cursor-pointer hover:text-neutral-400" />
      </MenuAction>
    </header>
  );
}
