import { AddCardsProps, CardsProps } from "../types";
import { GoPlus as AddIcon } from "react-icons/go";
import DropIndicator from "./DropIndicator";
import { useState } from "react";

export function Card(props: CardsProps) {
  const { title, id, columnName } = props;

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
  }

  return (
    <>
      <DropIndicator prevId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-300">{title}</p>
      </div>
    </>
  );
}

export function AddCard(props: AddCardsProps) {
  const { columnName } = props;
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

export default { Card, AddCard };
