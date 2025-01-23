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
  { name: "BACKLOCK", id: "backlock", color: "neutral" },
  { name: "TODO", id: "todo", color: "amber" },
  { name: "DOING", id: "doing", color: "cyan" },
  { name: "COMPLETE", id: "complete", color: "emerald" },
];

//Sidebar context
export const SIDEBAR_STATE: SideBarItemLink[] = [
  {
    name: "home",
    id: "home",
    icon: "home",
    path: "/board/home",
    columns: COLUMN_DEFAULT,
  },
];

export const SidebarContext = createContext<SideBarItemLink[]>(SIDEBAR_STATE);

export const SidebarDispatchContext = createContext<
  React.Dispatch<ActionsSidebarType>
>(() => {});
