import { useContext, useState } from "react";
import { GoPlus as AddIcon } from "react-icons/go";
import { CardDispatchContext } from "../Context";
import { AddCardsProps, CardsProps } from "../types";
import { FormatDate } from "../utils";
import DropIndicator from "./DropIndicator";

export function Card(props: CardsProps) {
  const { title, id, columnName, date } = props;

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("CardId", id);
  }

  return (
    <>
      <DropIndicator prevId={id} currColumn={columnName} />
      <div
        draggable
        onDragStart={handleDragStart}
        className="flex flex-col gap-1 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-300">{title}</p>
        <span className="text-xs text-neutral-500 self-end">{date}</span>
      </div>
    </>
  );
}

export function AddCard(props: AddCardsProps) {
  const { columnName } = props;
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const dispatch = useContext(CardDispatchContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;
    const newCard: CardsProps = {
      columnName,
      title: text.trim(),
      id: Math.random().toString(),
      date: FormatDate(new Date()),
    };

    dispatch({
      type: "add",
      newCard: newCard,
    });
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
