import { useContext, useState } from "react";
import { GoTrash as TrashIcon } from "react-icons/go";
import { HiOutlineFire as FireIcon } from "react-icons/hi2";
import { CardDispatchContext } from "../Context";

export default function TrashCan() {
  const [active, setActive] = useState(false);
  const dispatch = useContext(CardDispatchContext);

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
    });
    setActive(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`mt-12 flex flex-col max-h-56 aspect-square items-center justify-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-700 bg-neutral-800 text-neutral-400"
      }`}
    >
      {active ? <FireIcon /> : <TrashIcon />}
      <span className="text-xs mt-3">
        {active ? "Do it!" : "Drop a card here to delete it."}
      </span>
    </div>
  );
}
