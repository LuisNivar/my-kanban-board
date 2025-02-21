import clsx from "clsx";
import { TagSelectorProps } from "../../types";

export function TagSelector({ state, setTags }: TagSelectorProps) {
  return (
    <span className="flex items-center gap-1.5">
      <button
        onClick={() => {
          setTags({ ...state, red: !state.red });
        }}
        className={clsx(
          "w-10 h-4 cursor-pointer rounded border border-rose-500",
          state.red
            ? "bg-rose-500 hover:bg-rose-400"
            : "bg-neutral-800 hover:bg-rose-500/40"
        )}
      ></button>

      <button
        onClick={() => {
          setTags({ ...state, yellow: !state.yellow });
        }}
        className={clsx(
          "w-10 h-4 cursor-pointer rounded border border-yellow-500",
          state.yellow
            ? "bg-yellow-500 hover:bg-yellow-400"
            : "bg-neutral-800 hover:bg-yellow-500/40"
        )}
      ></button>

      <button
        onClick={() => {
          setTags({ ...state, green: !state.green });
        }}
        className={clsx(
          "w-10 h-4 cursor-pointer rounded border border-green-500",
          state.green
            ? "bg-green-500 hover:bg-green-400"
            : "bg-neutral-800 hover:bg-green-500/40"
        )}
      ></button>

      <button
        onClick={() => {
          setTags({ ...state, blue: !state.blue });
        }}
        className={clsx(
          "w-10 h-4 cursor-pointer rounded border border-blue-500",
          state.blue
            ? "bg-blue-500 hover:bg-blue-400"
            : "bg-neutral-800 hover:bg-blue-500/40"
        )}
      ></button>
    </span>
  );
}
