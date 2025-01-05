import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { GoKebabHorizontal as MoreIcon } from "react-icons/go";
import { CardDispatchContext } from "../Context";
import { CardProps } from "../types";
import DropIndicator from "./DropIndicator";
import { MenuAction } from "./MenuAction";

export function Card(props: CardProps) {
  const {
    title,
    description,
    id,
    columnName,
    date,
    tags,
    editable: init,
  } = props;

  const [editable, setEditable] = useState(init);
  const [inputText, setInputText] = useState(description);
  const dispatch = useContext(CardDispatchContext);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  //#region Handlers
  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      dispatch({
        type: "updateText",
        id,
        description: inputText,
        board: "home",
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
    dispatch({ type: "delete", board: "home", id });
  }

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
  }
  //#endregion

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

  return (
    <>
      <DropIndicator beforeId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        className="flex flex-col gap-1 cursor-grab rounded border border-neutral-700 hover:bg-neutral-700/60 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="text-neutral-300 text-sm font-medium">{title}</h1>
          <MenuAction
            card={props}
            onEdit={handleRename}
            onDelete={handleDelete}
          >
            <MoreIcon className="text-lg p-0.5 rounded hover:bg-neutral-600 text-neutral-600 cursor-pointer hover:text-neutral-400" />
          </MenuAction>
        </div>

        {editable ? (
          <textarea
            className="field-sizing-content selection:bg-teal-600 s px-2 py-1 rounded border border-teal-400 focus:outline-0 bg-teal-400/20 text-sm"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => console.log("focus")}
            ref={inputRef}
            onKeyDown={handleKey}
          />
        ) : (
          <p className="text-sm text-neutral-300 mb-0.5 text-pretty">
            {description}
          </p>
        )}
        <span className="flex items-center justify-between">
          <div className="flex gap-1">
            {tags.red && <span className="h-2 w-6 rounded bg-rose-500" />}
            {tags.yellow && <span className="h-2 w-6 rounded bg-yellow-500" />}
            {tags.green && <span className="h-2 w-6 rounded bg-emerald-500" />}
            {tags.blue && <span className="h-2 w-6 rounded bg-blue-500" />}
          </div>
          <span className="text-xs text-neutral-500 self-end">{date}</span>
        </span>
      </div>
    </>
  );
}
