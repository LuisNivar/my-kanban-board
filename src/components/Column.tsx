import { useState } from "react";
import { CardsProps, ColumProps } from "../types";
import { Card, AddCard } from "./Card";
import DropIndicator from "./DropIndicator";

export default function Column(props: ColumProps) {
  const { title, headingColor, cards, name } = props;
  const [active, setActive] = useState(false);

  // function handleDragStart(e : React.DragEvent, cardId : string ){
  //   e.dataTransfer.setData("CardId", cardId)
  // }

  const filteredCards = cards.filter((c: CardsProps) => c.columnName === name);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 gap-2 flex items-center">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
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
