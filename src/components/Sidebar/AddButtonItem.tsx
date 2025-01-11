import { useState } from "react";
import { GoPlus as AddIcon } from "react-icons/go";
import { BoardDialog } from "../BoardDialog";
import Tooltip from "../UI/Tooltip";

export default function AddButtonItem() {
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
