import { PropsWithChildren } from "react";

type BackgroundsCategoryProps = PropsWithChildren & { title: string };
export default function BackgroundsCategory({
  title,
  children,
}: BackgroundsCategoryProps) {
  return (
    <div>
      <h3 className="text-base mb-2">{title}</h3>
      <span className="grid grid-cols-4 gap-3">{children}</span>
    </div>
  );
}
