import { ColumProps, ItemProps } from "../../types";
import { Card } from "../Card";
import ColumnHeader from "./ColumnHeader";
import DraggableZone from "./DraggableZone";
import { NewTaskButton } from "./NewTaskButton";

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
      <DraggableZone cards={cards} name={name}>
        {filteredCards.map((card: ItemProps) => (
          <Card key={card.id} {...card} />
        ))}
      </DraggableZone>
      <NewTaskButton name={name} />
    </div>
  );
}
