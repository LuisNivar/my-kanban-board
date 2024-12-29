import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import {
  GoPlus as AddIcon,
  GoKebabHorizontal as MoreIcon,
} from "react-icons/go";

import { CardDispatchContext } from "../Context";
import { AddCardProps, CardProps, ItemProps, Tag } from "../types";
import { FormatDate } from "../utils";
import DropIndicator from "./DropIndicator";
import { MenuAction } from "./MenuAction";
import { TagSelector } from "./TagSelector";

export function Card(props: CardProps) {
  const { title, id, columnName, date, tags, editable: init } = props;
  const [editable, setEditable] = useState(init);
  const [text, setText] = useState(title);
  const dispatch = useContext(CardDispatchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      dispatch({
        type: "updateText",
        id,
        title: text,
      });
      setEditable(false);
    }

    if (e.key === "Escape") {
      setEditable(false);
    }
  }

  function handleRename() {
    setEditable(true);
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  function handleDelete() {
    dispatch({ type: "delete", id });
  }

  useLayoutEffect(() => {
    if (editable) {
      // HACK Use a timeout to prevent race condition between any active focus and this one
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [editable]);

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
  }

  return (
    <>
      <DropIndicator beforeId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        className="flex flex-col gap-0.5 cursor-grab rounded border border-neutral-700 hover:bg-neutral-700/60 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            {tags.red && <span className="h-2 w-4 rounded bg-rose-500" />}
            {tags.yellow && <span className="h-2 w-4 rounded bg-yellow-500" />}
            {tags.green && <span className="h-2 w-4 rounded bg-emerald-500" />}
            {tags.blue && <span className="h-2 w-4 rounded bg-blue-500" />}
          </div>
          <MenuAction
            card={props}
            onRename={handleRename}
            onDelete={handleDelete}
          >
            <MoreIcon className="text-lg p-0.5 rounded hover:bg-neutral-600 text-neutral-600 cursor-pointer hover:text-neutral-400" />
          </MenuAction>
        </div>

        {editable ? (
          <input
            className="selection:bg-teal-600 px-2 py-1 rounded border border-teal-400 focus:outline-0 bg-teal-400/20 text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => console.log("focus")}
            ref={inputRef}
            onKeyDown={handleKey}
          />
        ) : (
          <p className="text-sm text-neutral-300">{title}</p>
        )}
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

  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (isEmpty) return;

    const newCard: ItemProps = {
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
            onKeyDown={handleKey}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-teal-400 bg-teal-400/20 p-3 text-sm text-neutral-50 focus:outline-0"
          ></textarea>
          {/* <TagSelector state={tags} setTags={setTags} /> */}

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
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1 px-3 py-1 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>New card</span>
          <AddIcon />
        </button>
      )}
    </>
  );
}

export default { Card, AddCard };
