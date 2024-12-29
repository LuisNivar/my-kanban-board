import { useContext, useState } from "react";
import { CardDispatchContext } from "../Context";
import { ColumProps, ItemProps } from "../types";
import { AddCard, Card } from "./Card";
import DropIndicator from "./DropIndicator";

export default function Column(props: ColumProps) {
  const { title, headingColor, cards, name } = props;
  const [active, setActive] = useState(false);
  const dispatch = useContext(CardDispatchContext);

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
    e.preventDefault();
    updateCardPositions(e);
    clearHighlightIndicator();
    setActive(false);
  }
  //#endregion

  //#region Drop Indicators
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
  //#endregion

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
      type: "updateAll",
      cards: copy,
    });
  }

  const filteredCards = cards.filter((c: ItemProps) => c.columnName === name);

  return (
    <div className="w-full">
      <div className="px-3 py-2 rounded cursor-default bg-neutral-800/50 mb-1 gap-2 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="text-center text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/10"
        }`}
      >
        {filteredCards.map((card: ItemProps) => (
          <Card key={card.id} {...card} editable={false} />
        ))}

        <DropIndicator beforeId={null} currColumn={name} />
        <AddCard columnName={name} />
      </div>
    </div>
  );
}
