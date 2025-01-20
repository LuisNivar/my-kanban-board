import { PropsWithChildren, useContext, useState } from "react";
import { ItemProps } from "../../types";
import { CardDispatchContext, DEFAULT_BOARD } from "../../Context";
import { useParams } from "react-router-dom";
import DropIndicator from "../DropIndicator";
import clsx from "clsx";

type DragableZoneProps = PropsWithChildren & {
  name: string;
  cards: ItemProps[];
};
export default function DraggableZone({
  children,
  name,
  cards,
}: DragableZoneProps) {
  const dispatch = useContext(CardDispatchContext);
  const [active, setActive] = useState(false);
  const { id } = useParams();

  //#region Handlers
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    clearHighlightIndicator();
    setActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    updateCardPositions(e);
    clearHighlightIndicator();
    setActive(false);
  }

  //#endregion
  function getDropIndicators(): HTMLElement[] {
    return Array.from(document.querySelectorAll(`[data-column="${name}"]`));
  }

  function highlightIndicator(e: React.DragEvent) {
    const indicators = getDropIndicators();
    clearHighlightIndicator(indicators);
    const nearest = getNearestDropIndicator(e, indicators);
    nearest.element.style.opacity = "1";
  }

  function clearHighlightIndicator(dropsIndicator?: HTMLElement[]) {
    const indicator = dropsIndicator || getDropIndicators();
    indicator.forEach((el) => (el.style.opacity = "0"));
  }

  function getNearestDropIndicator(
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) {
    const DISTANCE_OFFSET = 48;

    const nearest = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        // Only consider indicators above the mouse pointer and closer than the current closest
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return nearest;
  }

  function updateCardPositions(e: React.DragEvent) {
    const cardId = e.dataTransfer.getData("CardID");
    const indicator = getDropIndicators();
    const { element } = getNearestDropIndicator(e, indicator);
    const beforeCardId = element.dataset.before || "-1";

    // Drop it in the same place
    if (beforeCardId === cardId) return;
    let copy = [...cards];

    // Search the card in the copy
    let cardToMove = copy.find((c) => c.id === cardId);

    // Prevent ghost cards
    if (!cardToMove) return;

    // Assign the current column
    cardToMove.columnName = name;

    // Remove the card of array
    copy = copy.filter((c) => c.id !== cardId);

    const isMoveToEnd = beforeCardId === "-1";

    if (isMoveToEnd) {
      copy.push(cardToMove);
    } else {
      const insertAtIndex = copy.findIndex((card) => card.id === beforeCardId);
      // Prevent ghost cards x2
      if (insertAtIndex === undefined) return;
      copy.splice(insertAtIndex, 0, cardToMove);
    }

    dispatch({
      type: "updateItemsBoard",
      cards: copy,
      board: id ?? DEFAULT_BOARD,
    });
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "rounded-lg px-2 h-[75vh] shadow-[0_2px_2px] bg-neutral-850/95 shadow-neutral-900/80  overflow-y-auto scroll-smooth w-full transition-colors",
        active && "bg-teal-500/15"
      )}
    >
      {children}
      <DropIndicator beforeId={null} currColumn={name} />
    </div>
  );
}
