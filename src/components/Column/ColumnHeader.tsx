import clsx from "clsx";

type ColumnHeaderProps = {
  count: number;
  title: string;
  color: string;
};

export default function ColumnHeader({
  color,
  title,
  count,
}: ColumnHeaderProps) {
  return (
    <header className="select-none px-3 py-2 rounded-lg cursor-default shadow-[0_2px_2px] shadow-neutral-900/80  bg-neutral-800 gap-4 flex items-center justify-center">
      <h3 className={clsx("font-medium", color)}>{title}</h3>
      <span className="text-center text-sm text-neutral-400">{count ?? 0}</span>
    </header>
  );
}
