import { headingColor } from "../../types";

export type ToogleColors = {
  color: headingColor;
  toggled: boolean;
};

export const DEFAULT_COLORS: ToogleColors[] = [
  { color: "neutral", toggled: false },
  { color: "amber", toggled: false },
  { color: "red", toggled: false },
  { color: "cyan", toggled: false },
  { color: "purple", toggled: false },
  { color: "emerald", toggled: false },
];

export const MAX_LENGTH = 12;
