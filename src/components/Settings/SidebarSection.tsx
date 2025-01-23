import { useContext, useState } from "react";
import { SidebarContext } from "../../Context";
import { AddIcon, SidebarIcon } from "../Icons";
import { Sections } from "./Sections";
import BoardItem from "./BoardItem";
import { MAX_BOARDS } from "../Sidebar/utils";
import BoardDialog from "../BoardDialog";

export default function SidebarSection() {
  const items = useContext(SidebarContext);
  const [open, setOpen] = useState(false);

  return (
    <Sections title="Boards | Workspaces" icon={<SidebarIcon />}>
      {items.map((board) => (
        <BoardItem
          key={board.icon}
          id={board.id}
          icon={board.icon}
          name={board.name}
        />
      ))}

      {items.length < MAX_BOARDS ? (
        <button
          className="hover:bg-neutral-300 hover:border-neutral-300 transition-colors hover:text-neutral-800 self-end text-sm py-2 px-3 rounded-md border border-neutral-600 flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <AddIcon /> Add more
        </button>
      ) : (
        <span className="select-none self-center italic text-teal-500 py-2">
          Max limit of board is 5
        </span>
      )}
      <BoardDialog open={open} onOpenChange={setOpen} />
    </Sections>
  );
}
