import { DropIndicatorProps } from "../types";

export default function DropIndicator(props: DropIndicatorProps) {
  const { beforeId, currColumn } = props;
  return (
    <div
      data-column={currColumn}
      data-before={beforeId || "-1"}
      className="rounded-lg my-0.5 h-0.5 w-full bg-teal-400 opacity-0"
    ></div>
  );
}
