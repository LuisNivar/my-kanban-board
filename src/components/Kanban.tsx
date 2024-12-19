import { useContext } from "react";
import { CardProvider } from "../CardProvider";
import { CardContext } from "../Context";
import Column from "./Column";
import TrashCan from "./TrashCan";

export function Kanban() {
  return (
    <CardProvider>
      <div className="h-screen w-full bg-neutral-900 text-neutral-100">
        <Board />
      </div>
    </CardProvider>
  );
}

function Board() {
  const cards = useContext(CardContext);

  return (
    <div className="flex h-full w-full gap-3 p-12">
      <Column
        title="Backlog"
        name="backlog"
        headingColor="text-neutral-400"
        cards={cards}
      />
      <Column
        title="TODO"
        name="todo"
        headingColor="text-amber-500"
        cards={cards}
      />
      <Column
        title="In Progress"
        name="in-progress"
        headingColor="text-cyan-500"
        cards={cards}
      />
      <Column
        title="Complete"
        name="complete"
        headingColor="text-teal-500"
        cards={cards}
      />
      <TrashCan />
    </div>
  );
}
