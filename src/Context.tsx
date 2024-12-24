import { createContext } from "react";
import { ActionsType, CardProps } from "./types";

export const CardContext = createContext<CardProps[] | []>([]);

export const CardDispatchContext = createContext<React.Dispatch<ActionsType>>(
  () => {}
);
