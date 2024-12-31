import { nanoid } from "nanoid";
import { PropsWithChildren, useContext, useState } from "react";
import { CardDispatchContext } from "../Context";
import { ColumProps, ItemProps, Tag } from "../types";
import { FormatDate } from "../utils";
import { TagSelector } from "./TagSelector";
import Dialog from "./UI/Dialog";

export type CardDialogProps = PropsWithChildren & {
  column: ColumProps["name"];
};

export function CardDialog({ children, column }: CardDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useContext(CardDispatchContext);
  const isEmpty = !title;

  const INITIAL_TAGS_STATE = {
    red: false,
    yellow: false,
    green: false,
    blue: false,
  };

  const [tags, setTags] = useState<Tag>(INITIAL_TAGS_STATE);

  function handleSave() {
    if (isEmpty) return;

    const newCard: ItemProps = {
      title: title,
      columnName: column,
      description: description.trim(),
      id: nanoid(),
      date: FormatDate(new Date()),
      tags: tags,
    };

    dispatch({
      type: "add",
      newCard: newCard,
    });

    Initialize();
  }

  function Initialize() {
    setTags(INITIAL_TAGS_STATE);
    setDescription("");
    setTitle("");
  }
  return (
    <Dialog>
      <Dialog.Trigger onClick={() => Initialize()}>{children}</Dialog.Trigger>
      <Dialog.Content title="New task">
        <div className="flex flex-col gap-3">
          <Field label="Title" htmlFor="title">
            <input
              className="inline-flex placeholder:text-neutral-500 w-full py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm leading-none outline-none selection:bg-teal-600"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New task..."
              autoFocus
              spellCheck="false"
            />
          </Field>
          <Field label="Description" htmlFor="description">
            <textarea
              className="max-h-24 placeholder:text-neutral-500 inline-flex w-full py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm text outline-none selection:bg-teal-600"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task. **Optional**"
              spellCheck="false"
            />
          </Field>
          <Field label="Tags" htmlFor="tags">
            <TagSelector state={tags} setTags={setTags} />
          </Field>
          <Dialog.Button
            className="self-end w-fit"
            onClick={() => handleSave()}
          >
            Save changes
          </Dialog.Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

type FieldProps = PropsWithChildren & { label: string; htmlFor: string };
function Field({ children, label, htmlFor }: FieldProps) {
  return (
    <fieldset className="flex items-center gap-5">
      <label className="w-24 text-right text-sm" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </fieldset>
  );
}
