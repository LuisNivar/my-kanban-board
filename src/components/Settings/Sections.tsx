import { PropsWithChildren } from "react";

type SectionsProps = PropsWithChildren & {
  title: string;
  icon?: React.ReactNode;
};
export function Sections({ children, title, icon }: SectionsProps) {
  return (
    <section className="flex gap-3 flex-col">
      <div className="rounded-lg text-base w-fit flex flex-col gap-2 p-3 bg-neutral-750">
        <h3 className="select-none ml-1 mb-2 flex items-center gap-2 text-lg">
          {icon} {title}
        </h3>
        {children}
      </div>
    </section>
  );
}
