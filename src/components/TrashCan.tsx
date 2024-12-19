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
