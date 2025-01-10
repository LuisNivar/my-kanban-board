import { createContext } from "react";
import {
  ActionsCardsType,
  ActionsSidebarType,
  BoardProps,
  SideBarItemLink,
} from "./types";

export const EMPTY_BOARD: BoardProps = { home: [], work: [] };
export const DEFAULT_BOARD = "home";

export const CardContext = createContext<BoardProps>(EMPTY_BOARD);

export const CardDispatchContext = createContext<
  React.Dispatch<ActionsCardsType>
>(() => {});

//Sidebar context
export const SIDEBAR_STATE: SideBarItemLink[] = [
  { name: "home", icon: "home", path: "/board/home" },
  { name: "work", icon: "work", path: "/board/work" },
];

export const SidebarContext = createContext<SideBarItemLink[]>(SIDEBAR_STATE);

export const SidebarDispatchContext = createContext<
  React.Dispatch<ActionsSidebarType>
>(() => {});
