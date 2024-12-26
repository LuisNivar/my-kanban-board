import { createContext } from "react";
import { ActionsType, ItemProps } from "./types";

export const CardContext = createContext<ItemProps[] | []>([]);

export const CardDispatchContext = createContext<React.Dispatch<ActionsType>>(
  () => {}
);
