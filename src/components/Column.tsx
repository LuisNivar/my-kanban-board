import { PropsWithChildren, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CardDispatchContext, DEFAULT_BOARD } from "../Context";
import { ColumProps, ItemProps } from "../types";
import { Card } from "./Card";
import DropIndicator from "./DropIndicator";
import { AddIcon } from "./Icons";
import { CardDialog } from "./CardDialog";

export default function Column(props: ColumProps) {
  const { title, headingColor, cards, name } = props;
  const filteredCards = cards.filter((c: ItemProps) => c.columnName === name);

  return (
    <div className="flex flex-col gap-2 shrink-0 grow-0 w-56 h-full">
      <ColumnHeader
        color={headingColor}
        title={title}
        count={filteredCards.length}
      />
      <DragableZone cards={cards} name={name}>
        {filteredCards.map((card: ItemProps) => (
          <Card key={card.id} {...card} />
        ))}
      </DragableZone>
      <NewTaskButton name={name} />
    </div>
  );
}

type ColumnHeaderProps = {
  count: number;
  title: string;
  color: string;
};
function ColumnHeader({ color, title, count }: ColumnHeaderProps) {
  return (
    <header className="select-none px-3 py-2 rounded-lg cursor-default shadow-[0_2px_2px] shadow-neutral-900/80  bg-neutral-800 gap-4 flex items-center justify-center">
      <h3 className={`font-medium ${color}`}>{title}</h3>
      <span className="text-center text-sm text-neutral-400">{count ?? 0}</span>
    </header>
  );
}

function NewTaskButton({ name }: { name: string }) {
  return (
    <CardDialog column={name}>
      <button className="select-none flex transition-colors  shadow-[0_2px_2px] shadow-neutral-900/80 justify-center text-sm items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100 bg-neutral-800">
        New Task
        <AddIcon />
      </button>
    </CardDialog>
  );
}

type DragableZoneProps = PropsWithChildren & {
  name: string;
  cards: ItemProps[];
};
function DragableZone({ children, name, cards }: DragableZoneProps) {
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
      className={`rounded-lg px-2 h-[75vh] shadow-[0_2px_2px] shadow-neutral-900/80  overflow-y-auto scroll-smooth w-full transition-colors ${
        active ? "bg-teal-500/15" : "bg-neutral-850/95"
      }`}
    >
      {children}
      <DropIndicator beforeId={null} currColumn={name} />
    </div>
  );
}
