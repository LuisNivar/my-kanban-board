import ColumnDialog from ".";
import { AddIcon } from "../Icons";

export default function NewColumnButton() {
  return (
    <ColumnDialog>
      <button className="px-3 py-2.5 select-none flex transition-colors  shadow-[0_2px_2px] shadow-neutral-900/80 justify-center text-sm items-center gap-2 w-full rounded-lg hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100 bg-neutral-800">
        New column
        <AddIcon />
      </button>
    </ColumnDialog>
  );
}
