import { createContext } from "react";
import { ActionsType, BoardProps } from "./types";

export const EMPTY_BOARD: BoardProps = { home: [], work: [] };
export const DEFAULT_BOARD = "home";

export const CardContext = createContext<BoardProps>(EMPTY_BOARD);

export const CardDispatchContext = createContext<React.Dispatch<ActionsType>>(
  () => {}
);
