import { useContext, useState } from "react";
import { GoPlus as AddIcon } from "react-icons/go";
import { GoKebabHorizontal as MoreIcon } from "react-icons/go";

import { CardDispatchContext } from "../Context";
import { AddCardProps, CardProps, Tag } from "../types";
import { FormatDate } from "../utils";
import DropIndicator from "./DropIndicator";
import { TagSelector } from "./TagSelector";
import { MenuAction } from "./MenuAction";

export function Card(props: CardProps) {
  const { title, id, columnName, date, tags } = props;

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
  }

  return (
    <>
      <DropIndicator prevId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        className="flex flex-col gap-1 cursor-grab rounded border border-neutral-700 hover:bg-neutral-700/60 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <div className="flex items-center justify-between">
          <span className="flex gap-1 mb-1">
            {tags.red && <span className="w-5 h-2 rounded bg-rose-500" />}
            {tags.yellow && <span className="w-5 h-2 rounded bg-yellow-500" />}
            {tags.green && <span className="w-5 h-2 rounded bg-emerald-500" />}
            {tags.blue && <span className="w-5 h-2 rounded bg-blue-500" />}
          </span>

          <MenuAction card={props}>
            <button className="outline-none text-base p-0.5 rounded hover:bg-neutral-600 text-neutral-600 cursor-pointer hover:text-neutral-400">
              <MoreIcon />
            </button>
          </MenuAction>
        </div>

        <p className="text-sm text-neutral-300">{title}</p>

        <span className="text-xs text-neutral-500 self-end">{date}</span>
      </div>
    </>
  );
}

export function AddCard({ columnName }: AddCardProps) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const dispatch = useContext(CardDispatchContext);
  const isEmpty = !text.trim().length;

  const INITIAL_TAGS_STATE = {
    red: false,
    yellow: false,
    green: false,
    blue: false,
  };

  const [tags, setTags] = useState<Tag>(INITIAL_TAGS_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty) return;
    const newCard: CardProps = {
      columnName,
      title: text.trim(),
      id: Math.random().toString(),
      date: FormatDate(new Date()),
      tags: tags,
    };

    dispatch({
      type: "add",
      newCard: newCard,
    });

    //reset
    setTags(INITIAL_TAGS_STATE);
    setText("");
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-teal-400 bg-teal-400/20 p-3 text-sm text-neutral-50 focus:outline-0"
          ></textarea>
          <TagSelector state={tags} setTags={setTags} />

          <div className="mt-1.5 flex items-center justify-end gap-2">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-2 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex rounded items-center gap-1 px-3 py-2 text-xs font-bold text-neutral-900 transition-colors bg-neutral-50 text-neutra-900"
            >
              Add
              <AddIcon />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1 px-3 py-1 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>New card</span>
          <AddIcon />
        </button>
      )}
    </>
  );
}

export default { Card, AddCard };
