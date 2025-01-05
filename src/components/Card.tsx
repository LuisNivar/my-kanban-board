import React, { useContext } from "react";
import { GoKebabHorizontal as MoreIcon } from "react-icons/go";
import { useParams } from "react-router-dom";
import { CardDispatchContext, DEFAULT_BOARD } from "../Context";
import { CardProps, Tag } from "../types";
import DropIndicator from "./DropIndicator";
import { MenuAction } from "./MenuAction";

export function Card(props: CardProps) {
  const { title, description, id, columnName, date, tags } = props;
  const dispatch = useContext(CardDispatchContext);
  const { id: boardId } = useParams();

  //#region Handlers
  function handleDelete() {
    dispatch({ type: "delete", board: boardId ?? DEFAULT_BOARD, id });
  }

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
  }
  //#endregion

  return (
    <>
      <DropIndicator beforeId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        className="flex flex-col gap-1 transition-colors cursor-grab rounded-lg hover:bg-neutral-700/60 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="text-neutral-300 text-sm font-medium">{title}</h1>
          <MenuAction card={props} onDelete={handleDelete}>
            <MoreIcon className="text-lg p-0.5 rounded hover:bg-neutral-600 text-neutral-600 cursor-pointer hover:text-neutral-400" />
          </MenuAction>
        </div>

        <p className="text-sm text-neutral-300 mb-0.5 text-pretty">
          {description}
        </p>
        <CardFooter tags={tags} date={date} />
      </div>
    </>
  );
}

type CardFooterProps = { tags: Tag; date: string };
function CardFooter({ tags, date }: CardFooterProps) {
  return (
    <span className="flex items-center justify-between">
      <div className="flex gap-1">
        {tags.red && <span className="h-2 w-6 rounded bg-rose-500" />}
        {tags.yellow && <span className="h-2 w-6 rounded bg-yellow-500" />}
        {tags.green && <span className="h-2 w-6 rounded bg-emerald-500" />}
        {tags.blue && <span className="h-2 w-6 rounded bg-blue-500" />}
      </div>
      <span className="text-xs text-neutral-500 self-end">{date}</span>
    </span>
  );
}
