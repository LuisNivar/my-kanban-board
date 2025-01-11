import { IconToggle, SideBarItemLink } from "../../types";
import {
  BookIcon,
  BoxIcon,
  CalendarIcon,
  CodeIcon,
  DataBaseIcon,
  FolderIcon,
  GameIcon,
  HammerIcon,
  HeartIcon,
  PinIcon,
  StarIcon,
  TrophyIcon,
} from "../Icons";

export const INITIAL_TOGGLE_ICON_STATE: IconToggle[] = [
  { key: "code", icon: <CodeIcon /> },
  { key: "book", icon: <BookIcon /> },
  { key: "game", icon: <GameIcon /> },
  { key: "heart", icon: <HeartIcon /> },
  { key: "star", icon: <StarIcon /> },
  { key: "hammer", icon: <HammerIcon /> },
  { key: "calendar", icon: <CalendarIcon /> },
  { key: "db", icon: <DataBaseIcon /> },
  { key: "folder", icon: <FolderIcon /> },
  { key: "pin", icon: <PinIcon /> },
  { key: "trophy", icon: <TrophyIcon /> },
  { key: "box", icon: <BoxIcon /> },
];

export function getIconState(sidebarState: SideBarItemLink[]): IconToggle[] {
  const prevIconState = [...INITIAL_TOGGLE_ICON_STATE];
  const usedIcons = [...sidebarState.map((i) => i.icon)];

  return prevIconState.map((i) => {
    if (usedIcons.includes(i.key)) {
      return { ...i, used: true };
    } else {
      return i;
    }
  });
}
