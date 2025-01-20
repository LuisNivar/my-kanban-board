import { CardDialog } from "../CardDialog";
import { AddIcon } from "../Icons";

export function NewTaskButton({ name }: { name: string }) {
  return (
    <CardDialog column={name}>
      <button className="select-none flex transition-colors  shadow-[0_2px_2px] shadow-neutral-900/80 justify-center text-sm items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100 bg-neutral-800">
        New Task
        <AddIcon />
      </button>
    </CardDialog>
  );
}
