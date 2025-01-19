export type backgroundToggle = {
  key: string;
  type: "gradient" | "image";
  value: string;
  toggled?: boolean;
  disable?: boolean;
};

export const BACKGROUNDS_COLLECTION: backgroundToggle[] = [
  { key: "astro", type: "image", value: "bg-astro", disable: true },
  { key: "atlantis", type: "image", value: "bg-atlantis", disable: true },
  {
    key: "black-pattern",
    type: "image",
    value: "bg-black-pattern",
    disable: true,
  },
  {
    key: "bokeh-lights",
    type: "image",
    value: "bg-bokeh-lights",
    disable: true,
  },
  {
    key: "china-night",
    type: "image",
    value: "bg-china-night",
    disable: true,
  },
  { key: "coal", type: "image", value: "bg-coal", disable: true },
  {
    key: "colorful-bokeh",
    type: "image",
    value: "bg-colorful-bokeh",
    disable: true,
  },
  { key: "sunset", type: "image", value: "bg-sunset", disable: true },
  {
    key: "pink",
    type: "gradient",
    value: "bg-gradient-to-tl from-pink-600 to-neutral-900 to-60%",
    disable: true,
  },
  {
    key: "amber",
    type: "gradient",
    value: "bg-gradient-to-tl from-amber-600 to-neutral-900 to-60%",
    disable: true,
  },
  {
    key: "sky",
    type: "gradient",
    value: "bg-gradient-to-tl from-sky-600 to-neutral-900 to-60%",
    disable: true,
  },
  {
    key: "emerald",
    type: "gradient",
    value: "bg-gradient-to-tl from-emerald-600 to-neutral-900 to-60%",
    disable: true,
  },
];

export const DEFAULT_BACKGROUND = "bg-neutral-900";

export function getBackground(key: string) {
  return BACKGROUNDS_COLLECTION.filter((b) => b.key === key)[0];
}

export function getBackgroundKeys(): string[] {
  const keys: string[] = Object.keys(BACKGROUNDS_COLLECTION);
  return keys;
}
