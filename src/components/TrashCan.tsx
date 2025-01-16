import { useContext, useState } from "react";
import { CardDispatchContext, DEFAULT_BOARD } from "../Context";
import { useParams } from "react-router-dom";
import { FireIcon, TrashIcon } from "./Icons";

export default function TrashCan() {
  const [active, setActive] = useState(false);
  const dispatch = useContext(CardDispatchContext);
  const { id } = useParams();

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setActive(true);
  }

  function handleDragLeave() {
    setActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("CardId");
    dispatch({
      type: "delete",
      id: cardId,
      board: id ?? DEFAULT_BOARD,
    });
    setActive(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group border-dashed transition-all select-none mt-12 flex flex-col min-w-32 scroll-mx-6 w-58 lg:max-h-56 aspect-square items-center justify-center rounded-lg border-2 text-3xl ${
        active
          ? " border-red-800 bg-red-800/20 text-red-500 text-[40px]"
          : "border-neutral-700 bg-neutral-800/30 text-neutral-400"
      }`}
    >
      {active ? <FireIcon /> : <TrashIcon />}
      <span className="text-xs mt-3 hidden xl:block">
        {active ? "Do it!" : "Drop a card here to delete it."}
      </span>
    </div>
  );
}
