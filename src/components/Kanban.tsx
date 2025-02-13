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
  const sidebar = useContext(SidebarContext);
  const boards = useContext(CardContext);

  if (!id) return;
  const cards: ItemProps[] = boards[id] ?? [];
  const columns = sidebar.find((s) => s.id === id)?.columns ?? [];

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
