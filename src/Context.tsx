import { nanoid } from "nanoid";
import { createContext } from "react";
import {
  ActionsCardsType,
  ActionsSidebarType,
  BoardProps,
  ColumnType,
  SideBarItemLink,
} from "./types";

export const EMPTY_BOARD: BoardProps = { home: [], work: [] };
export const DEFAULT_BOARD = "home";

export const CardContext = createContext<BoardProps>(EMPTY_BOARD);

export const CardDispatchContext = createContext<
  React.Dispatch<ActionsCardsType>
>(() => {});

export const COLUMN_DEFAULT: ColumnType[] = [
  { name: "BACKLOCK", id: nanoid(), color: "neutral" },
  { name: "TODO", id: nanoid(), color: "amber" },
  { name: "DOING", id: nanoid(), color: "cyan" },
  { name: "COMPLETE", id: nanoid(), color: "emerald" },
];

//Sidebar context
const homeId = nanoid();
export const SIDEBAR_STATE: SideBarItemLink[] = [
  {
    name: "home",
    id: homeId,
    icon: "home",
    path: `/board/${homeId}`,
    columns: COLUMN_DEFAULT,
  },
];

export const SidebarContext = createContext<SideBarItemLink[]>(SIDEBAR_STATE);

export const SidebarDispatchContext = createContext<
  React.Dispatch<ActionsSidebarType>
>(() => {});
