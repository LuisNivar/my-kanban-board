import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CardProvider } from "../CardProvider";
import { CardContext, SidebarContext } from "../Context";
import { ItemProps } from "../types";
import TrashCan from "./TrashCan";
import { DEFAULT_BACKGROUND } from "./Settings/utils";
import Column from "./Column";

export function Kanban() {
  const state = useContext(SidebarContext);
  //TODO: Find a better way
  const { id } = useParams();
  const background =
    state.filter((b) => b.name === id)[0]?.background ?? DEFAULT_BACKGROUND;

  return (
    <CardProvider>
      <div
        className={`h-screen w-full px-6 py-5 overflow-x-auto bg-cover text-neutral-100 ${background}`}
      >
        <Columns />
      </div>
    </CardProvider>
  );
}

function Columns() {
  const { id } = useParams();
  const boards = useContext(CardContext);

  //FIXME: Get a better way to to that
  if (!id) return;
  const cards: ItemProps[] = boards[id] ?? [];

  return (
    <main className="whitespace-nowrap flex gap-2 xl:grid xl:grid-cols-5 ">
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
