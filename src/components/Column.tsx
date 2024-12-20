import { useContext, useState } from "react";
import { CardsProps, ColumProps } from "../types";
import { Card, AddCard } from "./Card";
import DropIndicator from "./DropIndicator";
import { CardDispatchContext } from "../Context";

export default function Column(props: ColumProps) {
  const { title, headingColor, cards, name } = props;
  const [active, setActive] = useState(false);

  const dispatch = useContext(CardDispatchContext);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("CardID");
    dispatch({
      type: "move",
      id: cardId,
      column: name,
    });
    setActive(false);
  }

  const filteredCards = cards.filter((c: CardsProps) => c.columnName === name);

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
        {filteredCards.map((c: CardsProps) => (
          <Card key={c.id} {...c} />
        ))}
        <DropIndicator currColumn={name} />
        <AddCard columnName={name} />
      </div>
    </div>
  );
}
