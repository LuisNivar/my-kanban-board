import clsx from "clsx";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarDispatchContext } from "../../Context";
import Dialog, { DialogProps } from "../UI/Dialog";
import { DEFAULT_COLORS, MAX_LENGTH, ToogleColors } from "./utils";
import { ColumnType, headingColor } from "../../types";
import { COLOR_HEADING_DICTIONARY } from "../../utils";

type columnDialogProps = DialogProps & { column?: ColumnType };
export default function ColumnDialog({
  children,
  column,
  ...props
}: columnDialogProps) {
  const isEditing = column !== undefined;

  const { id } = useParams();
  const [name, setName] = useState(isEditing ? column.name : "");
  const [colors, setColors] = useState<ToogleColors[]>(DEFAULT_COLORS);
  const [selection, setSelection] = useState<headingColor>(
    column?.color ?? "neutral"
  );

  const dispatch = useContext(SidebarDispatchContext);

  function handleColors(color: headingColor) {
    setSelection(color);
  }

  useEffect(() => {
    setColors(
      colors.map((c) => {
        if (c.color === selection) {
          return { ...c, toggled: !c.toggled };
        } else return { ...c, toggled: false };
      })
    );
  }, [selection]);

  function Create() {
    //TODO: Find a better way
    if (!selection) return;
    if (!id) return;

    const newColumn = {
      color: selection,
      id: nanoid(),
      name,
    };
    dispatch({ type: "addColumn", boardId: id, newColumn });
  }

  function Edit() {
    //TODO: Find a better way
    if (!isEditing) return;
    if (!id) return;

    const newValues = {
      color: selection,
      name,
    };

    dispatch({
      type: "updateColumn",
      boardId: id,
      columnId: column.id,
      values: newValues,
    });
  }

  function handleConfirm() {
    if (isEditing) {
      Edit();
    } else {
      Create();
    }
  }

  function Reset() {
    setName("");
  }

  return (
    <Dialog {...props}>
      <Dialog.Trigger onClick={() => Reset()}>{children}</Dialog.Trigger>
      <Dialog.Content title={isEditing ? "Edit Column" : "New Column"}>
        <div className="w-56 flex flex-col gap-3">
          <fieldset className="flex flex-col gap-2">
            <label className="text-neutral-300 font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="w-full inline-flex placeholder:text-neutral-500 py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm leading-none outline-none selection:bg-teal-600"
              id="name"
              autoComplete="on"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoFocus
              spellCheck="false"
              maxLength={MAX_LENGTH}
              value={name}
            />
          </fieldset>

          <label className="text-neutral-300 font-medium" htmlFor="colors">
            Colors
          </label>

          <span className="flex gap-3 items-center justify-center">
            {colors.map((c, index) => (
              <button
                key={index}
                className={clsx(
                  "size-6 rounded-full",
                  COLOR_HEADING_DICTIONARY[c.color].bg,
                  c.toggled &&
                    "ring-2 ring-offset-4 ring-offset-neutral-800 ring-teal-500"
                )}
                onClick={() => handleColors(c.color)}
              />
            ))}
          </span>
          <Dialog.Button
            className="self-end mt-3"
            variant="default"
            onClick={() => handleConfirm()}
          >
            {isEditing ? "Save" : "Create"}
          </Dialog.Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
