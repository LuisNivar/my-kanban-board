import clsx from "clsx";
import { PropsWithChildren, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CardDispatchContext, DEFAULT_BOARD } from "../../Context";
import { ItemProps } from "../../types";
import DropIndicator from "../DropIndicator";
import {
  clearHighlightIndicator,
  getNewCardPositions,
  highlightIndicator,
} from "./utils";

type DragableZoneProps = PropsWithChildren & {
  id: string;
  cards: ItemProps[];
};
export default function DraggableZone({
  children,
  id: ColumnId,
  cards,
}: DragableZoneProps) {
  const dispatch = useContext(CardDispatchContext);
  const [active, setActive] = useState(false);
  const { id } = useParams();

  //#region Handlers
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    highlightIndicator(e, ColumnId);
    setActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    clearHighlightIndicator(ColumnId);
    setActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    const newCards = getNewCardPositions(e, ColumnId, cards);

    dispatch({
      type: "updateItemsBoard",
      cards: newCards,
      board: id ?? DEFAULT_BOARD,
    });

    clearHighlightIndicator(ColumnId);
    setActive(false);
  }
  //#endregion

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "rounded-lg px-2 h-full shadow-[0_2px_2px] bg-neutral-850/95 shadow-neutral-900/80  overflow-y-auto scroll-smooth w-full transition-colors",
        active && "bg-teal-500/15"
      )}
    >
      {children}
      <DropIndicator beforeId={null} currColumn={ColumnId} />
    </div>
  );
}
