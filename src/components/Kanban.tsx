import React, { useState } from "react";
import { GoTrash as TrashIcon } from "react-icons/go";
import { HiOutlineFire as FireIcon } from "react-icons/hi2";
import { GoPlus as AddIcon } from "react-icons/go";

export function Kanban() {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-100">
      <Board />
    </div>
  );
}

function Board() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  return (
    <div className="flex h-full w-full gap-3 p-12">
      <Column
        title="Backlog"
        name="backlog"
        headingColor="text-neutral-400"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        name="todo"
        headingColor="text-amber-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        name="in-progress"
        headingColor="text-cyan-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        name="complete"
        headingColor="text-teal-500"
        cards={cards}
        setCards={setCards}
      />
      <TrashCan setCards={setCards} />
    </div>
  );
}

type ColumProps = {
  title: string;
  headingColor: string;
  name: string;
  cards: any;
  setCards: any;
};

type CardsProps = {
  title: string;
  columnName: string;
  id: string;
};

function Column(props: ColumProps) {
  const { title, headingColor, cards, name, setCards } = props;
  const [active, setActive] = useState(false);

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
        <AddCard columnName={name} setCards={setCards} />
      </div>
    </div>
  );
}

function Card(props: CardsProps) {
  const { title, id, columnName } = props;
  return (
    <>
      <DropIndicator prevId={id} currColumn={columnName} />
      <div
        draggable
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-300">{title}</p>
      </div>
    </>
  );
}

type DropIndicatorProps = {
  prevId?: string;
  currColumn: string;
};

function DropIndicator(props: DropIndicatorProps) {
  const { prevId, currColumn } = props;
  return (
    <div
      data-prev={prevId || "-1"}
      data-column={currColumn}
      className="rounded-lg my-0.5 h-0.5 w-full bg-teal-400 opacity-0"
    ></div>
  );
}

function TrashCan(setCards: any) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`mt-10 flex h-56 w-56 items-center justify-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-nutra-500"
      }`}
    >
      {active ? <FireIcon /> : <TrashIcon />}
    </div>
  );
}

type AddCardsProps = {
  setCards: any;
  columnName: string;
};

function AddCard(props: AddCardsProps) {
  const { columnName, setCards } = props;
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;
    const newCard: CardsProps = {
      columnName,
      title: text.trim(),
      id: Math.random().toString(),
    };
    console.log(columnName);
    setCards((cards: Array<CardsProps>) => [...cards, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-teal-400 bg-teal-400/20 p-3 text-sm text-neutral-50 placeholder:teal-300 focus:outline-0"
          ></textarea>
          <div className="mt-1.5 flex items-center justify-end gap-2">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-2 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex rounded items-center gap-1 px-3 py-2 text-xs font-bold text-neutral-900 transition-colors bg-neutral-50 text-neutra-900"
            >
              Add
              <AddIcon />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1 px-3 py-1 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <AddIcon />
        </button>
      )}
    </>
  );
}

const INITIAL_CARDS: Array<CardsProps> = [
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
