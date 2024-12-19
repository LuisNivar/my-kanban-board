import { createContext } from "react";
import { ActionsType, CardsProps } from "./types";

export const CardContext = createContext<CardsProps[] | []>([]);

export const CardDispatchContext = createContext<React.Dispatch<ActionsType>>(
  () => {}
);
