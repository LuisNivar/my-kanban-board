export function FormatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export const IS_DEV = import.meta.env.MODE === "development";

/**
 * To add hour
 * ${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
 */
