import { useContext, useState } from "react";
import { CardDispatchContext } from "../Context";
import { ColumProps, ItemProps } from "../types";
import { AddCard, Card } from "./Card";
import DropIndicator from "./DropIndicator";

export default function Column(props: ColumProps) {
  const { title, headingColor, cards, name } = props;
  const [active, setActive] = useState(false);
  const dispatch = useContext(CardDispatchContext);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setActive(false);
    clearHighlightIndicator();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("CardID");

    setActive(false);
    clearHighlightIndicator();

    const indicator = getDropIndicators();
    const { element } = getNearestDropIndicator(e, indicator);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, columnName: name };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      dispatch({
        type: "updateAll",
        cards: copy,
      });
    }
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

  function getDropIndicators(): HTMLElement[] {
    return Array.from(document.querySelectorAll(`[data-column="${name}"]`));
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
        {filteredCards.map((card: ItemProps, order: number) => (
          <Card key={card.id} order={order} {...card} editable={false} />
        ))}
        <DropIndicator beforeId={null} currColumn={name} />
        <AddCard columnName={name} />
      </div>
    </div>
  );
}
