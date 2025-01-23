import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CardProvider } from "../CardProvider";
import { CardContext, SidebarContext } from "../Context";
import { ItemProps } from "../types";
import Column from "./Column";
import { DEFAULT_BACKGROUND } from "./Settings/utils";
import TrashCan from "./TrashCan";
import NewColumnButton from "./ColumnDialog/NewColumnButton";

export function Kanban() {
  const state = useContext(SidebarContext);
  //TODO: Find a better way
  const { id } = useParams();
  const background =
    state.filter((b) => b.id === id)[0]?.background ?? DEFAULT_BACKGROUND;

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
  const sidebar = useContext(SidebarContext);

  //FIXME: Get a better way to to that
  if (!id) return;
  const cards: ItemProps[] = boards[id] ?? [];
  const columns = sidebar.filter((s) => s.id === id)[0]?.columns ?? [];

  return (
    <main className="w-fit overflow-x-auto h-full pb-1 flex gap-2">
      {columns.map((c) => (
        <Column key={c.id} {...c} cards={cards} />
      ))}
      <div className="flex flex-col gap-4">
        <NewColumnButton />
        <TrashCan />
      </div>
    </main>
  );
}
