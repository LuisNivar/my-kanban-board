import { DropIndicatorProps } from "../types";

export default function DropIndicator(props: DropIndicatorProps) {
  const { beforeId, currColumn } = props;
  return (
    <div
      data-column={currColumn}
      data-before={beforeId || "-1"}
      className="relative after:content-[''] after:absolute after:size-2 after:left-0 after:-top-0.5 after:bg-teal-600 after:rounded-full rounded-lg my-0.5 h-1 w-full bg-teal-600 opacity-0"
    ></div>
  );
}
