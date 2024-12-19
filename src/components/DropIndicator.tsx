import { DropIndicatorProps } from "../types";

export default function DropIndicator(props: DropIndicatorProps) {
  const { prevId, currColumn } = props;
  return (
    <div
      data-prev={prevId || "-1"}
      data-column={currColumn}
      className="rounded-lg my-0.5 h-0.5 w-full bg-teal-400 opacity-0"
    ></div>
  );
}
