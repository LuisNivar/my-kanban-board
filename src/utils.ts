export function FormatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export const IS_DEV = import.meta.env.MODE === "development";

export const COLOR_HEADING_DICTIONARY: {
  [color: string]: { text: string; bg: string };
} = {
  ["neutral"]: { text: "text-neutral-400", bg: "bg-neutral-400" },
  ["red"]: { text: "text-red-400", bg: "bg-red-400" },
  ["purple"]: { text: "text-purple-400", bg: "bg-purple-400" },
  ["cyan"]: { text: "text-cyan-500", bg: "bg-cyan-500" },
  ["emerald"]: { text: "text-emerald-500", bg: "bg-emerald-500" },
  ["amber"]: { text: "text-amber-500", bg: "bg-amber-500" },
};
