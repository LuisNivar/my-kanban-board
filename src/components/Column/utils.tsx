import { ItemProps } from "../../types";

export function getDropIndicators(column: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
}

export function clearHighlightIndicator(
  dropsIndicator: HTMLElement[] | string
) {
  //HACK
  const indicator =
    typeof dropsIndicator === "string"
      ? getDropIndicators(dropsIndicator)
      : dropsIndicator;
  indicator.forEach((el) => (el.style.opacity = "0"));
}

export function highlightIndicator(e: React.DragEvent, column: string) {
  const indicators = getDropIndicators(column);
  clearHighlightIndicator(indicators);
  const nearest = getNearestDropIndicator(e, indicators);
  nearest.element.style.opacity = "1";
}

export function getNearestDropIndicator(
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

export function getNewCardPositions(
  e: React.DragEvent,
  column: string,
  cards: ItemProps[]
): ItemProps[] {
  const cardId = e.dataTransfer.getData("CardID");
  const indicator = getDropIndicators(column);
  const { element } = getNearestDropIndicator(e, indicator);
  const beforeCardId = element.dataset.before || "-1";

  // Drop it in the same place
  if (beforeCardId === cardId) return cards;
  let copy = [...cards];

  // Search the card in the copy
  let cardToMove = copy.find((c) => c.id === cardId);

  // Prevent ghost cards
  if (!cardToMove) return cards;

  // Assign the current column
  cardToMove.columnName = column;

  // Remove the card of array
  copy = copy.filter((c) => c.id !== cardId);

  const isMoveToEnd = beforeCardId === "-1";

  if (isMoveToEnd) {
    copy.push(cardToMove);
  } else {
    const insertAtIndex = copy.findIndex((card) => card.id === beforeCardId);
    // Prevent ghost cards x2
    if (insertAtIndex === undefined) return cards;
    copy.splice(insertAtIndex, 0, cardToMove);
  }

  return copy;
}
