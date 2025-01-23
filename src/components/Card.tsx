import { formatDistance } from "date-fns";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CardDispatchContext, DEFAULT_BOARD } from "../Context";
import { CardProps, Tag } from "../types";
import DropIndicator from "./DropIndicator";
import { MoreIcon } from "./Icons";
import clsx from "clsx";
import { MenuAction } from "./CardMenuAction";

export function Card(props: CardProps) {
  const { title, description, id, columnId: columnName, date, tags } = props;
  const dispatch = useContext(CardDispatchContext);
  const [isDragging, setIsDragging] = useState(false);
  const { id: boardId } = useParams();

  //#region Handlers
  function handleDelete() {
    dispatch({ type: "delete", board: boardId ?? DEFAULT_BOARD, id });
  }

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
    setIsDragging(true);
  }

  function handleEnd(e: React.DragEvent) {
    e.stopPropagation();
    setIsDragging(false);
  }
  //#endregion

  return (
    <>
      <DropIndicator beforeId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleEnd}
        className={clsx(
          "flex flex-col gap-1 transition-colors cursor-grab rounded-lg hover:bg-neutral-740 bg-neutral-800  shadow-[0_4px_4px] shadow-neutral-900/80  p-3 active:cursor-grabbing",
          isDragging && "border-2 border-teal-600 hover:bg-neutral-800"
        )}
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

type CardFooterProps = { tags: Tag; date: Date };
function CardFooter({ tags, date }: CardFooterProps) {
  const formatDate = formatDistance(date, new Date(), { addSuffix: false });
  return (
    <span className="flex items-center gap-2 justify-between">
      <div className="w-[70px] inline-flex gap-1">
        {/* RED */}
        {tags.red && (
          <span className="h-2 grow w-3 max-w-5 rounded bg-rose-500" />
        )}
        {/* YELLOW */}
        {tags.yellow && (
          <span className="h-2 grow  w-3 max-w-5 rounded bg-yellow-500" />
        )}
        {/* GREEN */}
        {tags.green && (
          <span className="h-2 grow w-3 max-w-5 rounded bg-emerald-500" />
        )}
        {/* BLUE */}
        {tags.blue && (
          <span className="h-2 grow w-3 max-w-5 rounded bg-blue-500" />
        )}
      </div>

      <span className="text-xs text-neutral-500">{formatDate}</span>
    </span>
  );
}
