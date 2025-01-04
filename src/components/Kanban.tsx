import { useContext } from "react";
import { CardProvider } from "../CardProvider";
import { CardContext } from "../Context";
import Column from "./Column";
import TrashCan from "./TrashCan";

export function Kanban() {
  return (
    <CardProvider>
      <div className="h-screen w-full p-6 bg-neutral-900 text-neutral-100">
        <Columns />
      </div>
    </CardProvider>
  );
}

function Columns() {
  const cards = useContext(CardContext);

  return (
    <main className="grid gap-2 grid-cols-5 ">
      <Column
        title="BACKLOG"
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
        title="IN PROGRESS"
        name="in-progress"
        headingColor="text-cyan-500"
        cards={cards}
      />
      <Column
        title="COMPLETE"
        name="complete"
        headingColor="text-emerald-500"
        cards={cards}
      />
      <TrashCan />
    </main>
  );
}
