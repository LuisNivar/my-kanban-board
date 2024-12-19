import { useReducer } from "react";
import { CardsProps } from "../types";
import Column from "./Column";
import TrashCan from "./TrashCan";

export function Kanban() {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-100">
      <Board />
    </div>
  );
}

type ActionsType = {
  type: string;
  newCard: CardsProps;
  id?: string;
};

function reducer(cards: CardsProps[], action: ActionsType) {
  switch (action.type) {
    case "add": {
      return [...cards, action.newCard];
    }
    case "delete": {
      return cards.filter((c) => c.id !== action.id);
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

function Board() {
  //const [cards, setCards] = useState(INITIAL_CARDS);
  const [cards, dispatch] = useReducer(reducer, INITIAL_CARDS);

  function handleAddCard(card: CardsProps) {
    dispatch({
      type: "add",
      newCard: card,
    });
  }

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

const INITIAL_CARDS: CardsProps[] = [
  {
    title: "Something to do...",
    columnName: "backlog",
    id: "1",
  },
  {
    title: "Another thing to do...",
    columnName: "todo",
    id: "2",
  },
  {
    title: "A thing to figure out..",
    columnName: "todo",
    id: "6",
  },
  {
    title: "A stuff to solve...",
    columnName: "in-progress",
    id: "3",
  },
  {
    title: "A real thing to try",
    columnName: "backlog",
    id: "4",
  },
  {
    title: "Some foods to taste...",
    columnName: "complete",
    id: "5",
  },
];
