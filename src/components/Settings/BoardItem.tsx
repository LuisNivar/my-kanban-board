import { useContext, useRef, useState } from "react";
import { SidebarDispatchContext } from "../../Context";
import { ICON_DICTIONARY } from "../Sidebar/utils";
import { EditIcon, TrashIcon } from "../Icons";
import DeleteDialog from "../DeleteDialog";

type BoardItemProps = {
  icon: string;
  name: string;
};

export default function BoardItem({ icon, name }: BoardItemProps) {
  const [inputName, setInputName] = useState(name);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useContext(SidebarDispatchContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputName(e.target.value);
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    setEditing(!editing);
    // HACK Use a timeout to prevent race condition between any active focus and this one
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 100);
    return () => clearTimeout(timeout);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!inputRef.current) return;

    if (e.key === "Escape") {
      inputRef.current.setSelectionRange(0, 0);
      inputRef.current.blur();
      setInputName(name);
      setEditing(false);
    }

    if (e.key === "Enter") {
      //TODO: Change path and persist data
      dispatch({ type: "rename", newName: inputName, icon });
      inputRef.current.setSelectionRange(0, 0);
      inputRef.current.blur();
      setEditing(false);
    }
  }

  function handleDelete(e: React.MouseEvent<HTMLElement>) {
    setOpen(true);
  }

  function Delete() {
    dispatch({ type: "delete", icon });
  }

  return (
    <>
      <span className="pl-4 select-none flex items-center p-2 gap-1 rounded-lg bg-neutral-700/30 text-neutral-400">
        {ICON_DICTIONARY[icon]}
        <input
          name={name}
          className="ml-1 disabled:select-none disabled:text-neutral-400 selection:bg-teal-700 selection:text-teal-100 rounded-lg px-2 outline-0 py-0.5 text-teal-300 disabled:border-transparent border-2 border-teal-600 bg-teal-800/20 disabled:bg-transparent"
          disabled={!editing}
          value={inputName}
          spellCheck={false}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 rounded-lg transition-colors  hover:bg-neutral-700"
          onClick={handleClick}
        >
          <EditIcon />
        </button>

        <button
          className="group p-2 rounded-lg hover:bg-red-800/20"
          onClick={handleDelete}
        >
          <TrashIcon className="transition-colors text-red-400 group-hover:text-red-300" />
        </button>
      </span>
      {/* TODO: Elevete component */}
      <DeleteDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => Delete()}
      />
    </>
  );
}
