import { useContext } from "react";
import { CardProvider } from "../CardProvider";
import { CardContext } from "../Context";
import Column from "./Column";
import TrashCan from "./TrashCan";

export function Kanban() {
  return (
    <CardProvider>
      <div className="h-screen w-full py-6 px-12 bg-neutral-900 text-neutral-100">
        <Board />
      </div>
    </CardProvider>
  );
}

function Board() {
  const cards = useContext(CardContext);

  return (
    <div className="grid gap-2 grid-cols-5 ">
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
        headingColor="text-emerald-500"
        cards={cards}
      />
      <TrashCan />
    </div>
  );
}
