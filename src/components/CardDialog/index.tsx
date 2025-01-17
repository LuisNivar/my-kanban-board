import { nanoid } from "nanoid";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardDispatchContext, DEFAULT_BOARD } from "../../Context";
import { CardProps, ColumProps, ItemProps, Tag } from "../../types";
import { FormatDate } from "../../utils";
import Dialog, { DialogProps } from "../UI/Dialog";
import { Field } from "./Field";
import { TagSelector } from "./TagSelector";
import {
  INITIAL_TAGS_STATE,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_TITLE,
} from "./utils";

export type CardDialogProps = DialogProps & {
  column: ColumProps["name"];
  card?: CardProps;
};

export function CardDialog({
  children,
  column,
  card,
  ...props
}: CardDialogProps) {
  const isEditing = !!card;
  const [title, setTitle] = useState(isEditing ? card.title : "");
  const [description, setDescription] = useState(
    isEditing ? card.description : ""
  );
  const [lengthDescription, setLenghtDescription] = useState(
    isEditing ? card.description.length : 0
  );

  const dispatch = useContext(CardDispatchContext);
  const isEmpty = !title;
  const { id } = useParams();

  const [tags, setTags] = useState<Tag>(
    isEditing ? card.tags : INITIAL_TAGS_STATE
  );

  useEffect(() => {
    if (!isEditing) return;
    setTags(card.tags);
    setDescription(card.description);
    setTitle(card.title);
  }, [card]);

  function handleOk() {
    if (isEditing) {
      Edit();
    } else {
      Save();
    }
  }

  function Save() {
    if (isEmpty) return;

    const newCard: ItemProps = {
      title: title,
      columnName: column,
      description: description.trim(),
      id: nanoid(),
      date: new Date(),
      tags: tags,
    };

    dispatch({
      type: "add",
      newCard: newCard,
      board: id ?? DEFAULT_BOARD,
    });

    Initialize();
  }

  function Edit() {
    if (!isEditing) return;
    if (isEmpty) return;

    const newProps = {
      title: title,
      columnName: column,
      description: description.trim(),
      date: new Date(),
      tags: tags,
    };

    dispatch({
      type: "update",
      id: card.id,
      value: newProps,
      board: id ?? DEFAULT_BOARD,
    });

    Initialize();
  }

  function Initialize() {
    setTags(INITIAL_TAGS_STATE);
    setDescription("");
    setTitle("");
    setLenghtDescription(0);
  }

  function HandleChangeDescrition(e: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
    setLenghtDescription(e.target.value.length);
  }

  return (
    <Dialog {...props}>
      <Dialog.Trigger onClick={() => Initialize()}>{children}</Dialog.Trigger>
      <Dialog.Content title={isEditing ? "Edit Task" : "New Task"}>
        <div className="flex flex-col gap-3 w-[400px]">
          <Field label="Title" htmlFor="title">
            <input
              className="inline-flex placeholder:text-neutral-500 py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm leading-none outline-none selection:bg-teal-600"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New task..."
              autoFocus
              spellCheck="false"
              value={title}
              maxLength={MAX_LENGTH_TITLE}
            />
          </Field>
          <Field label="Description" htmlFor="description">
            <textarea
              className="max-h-24 h-16 placeholder:text-neutral-500 inline-flex w-full py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm text outline-none selection:bg-teal-600"
              id="description"
              onChange={HandleChangeDescrition}
              placeholder="Describe your task. **Optional**"
              spellCheck="false"
              value={description}
              maxLength={MAX_LENGTH_DESCRIPTION}
            />
          </Field>
          <span className="text-neutral-500 -mt-1 text-xs self-end">{`${lengthDescription}/${MAX_LENGTH_DESCRIPTION}`}</span>
          <Field label="Tags" htmlFor="tags">
            {/* //FIXME: Investigate the correct way to match label with the fieldset*/}
            <TagSelector id="tags" state={tags} setTags={setTags} />
          </Field>

          <Dialog.Button
            variant="default"
            className="mt-3 self-end w-fit"
            onClick={() => handleOk()}
          >
            {isEditing ? "Save changes" : "Save"}
          </Dialog.Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
