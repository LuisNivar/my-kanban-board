import { useContext, useState } from "react";
import { SidebarDispatchContext } from "../../Context";
import { IconToggle, SideBarItemLink } from "../../types";
import Dialog, { DialogProps } from "../UI/Dialog";
import { IconsGroup } from "./IconsGroup";

export default function BoardDialog({ children, ...props }: DialogProps) {
  const [selection, setSelection] = useState<IconToggle | null>(null);
  const [name, setName] = useState("");
  const MAX_LENGTH_NAME = 16;
  const dispatch = useContext(SidebarDispatchContext);

  function handleCreate() {
    if (!selection) return;

    const newItemLink: SideBarItemLink = {
      name: name,
      icon: selection.key,
      path: `/board/${name}`,
    };

    dispatch({
      type: "add",
      itemLink: newItemLink,
    });

    //rest
    setName("");
  }

  return (
    <Dialog {...props}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content title="Add new board">
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-neutral-300">Icon</h3>
          <div className="self-center grid grid-cols-4 gap-2">
            <IconsGroup onSelection={setSelection} />
          </div>
          <h3 className="font-medium text-neutral-300">Name</h3>
          <input
            className="w-full inline-flex placeholder:text-neutral-500 py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm leading-none outline-none selection:bg-teal-600"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="board"
            autoFocus
            spellCheck="false"
            value={name}
            maxLength={MAX_LENGTH_NAME}
          />
          <Dialog.Button
            className="mt-3 self-end w-fit"
            onClick={() => handleCreate()}
          >
            Create
          </Dialog.Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
