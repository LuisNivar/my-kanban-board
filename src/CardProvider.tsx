import { useReducer } from "react";
import { CardContext, CardDispatchContext } from "./Context";
import { ActionsType, CardsProps } from "./types";

const INITIAL_CARDS: CardsProps[] = [
  {
    title: "Something to do...",
    columnName: "backlog",
    id: "1",
  },
  {
    title: "Another thing to do...",
    columnName: "todo",
    id: "2",
  },
  {
    title: "A thing to figure out..",
    columnName: "todo",
    id: "6",
  },
  {
    title: "A stuff to solve...",
    columnName: "in-progress",
    id: "3",
  },
  {
    title: "A real thing to try",
    columnName: "backlog",
    id: "4",
  },
  {
    title: "Some foods to taste...",
    columnName: "complete",
    id: "5",
  },
];

function reducer(cards: CardsProps[], action: ActionsType) {
  switch (action.type) {
    case "add": {
      return [...cards, action.newCard];
    }
    case "delete": {
      return cards.filter((c) => c.id !== action.id);
    }
    case "move": {
      return cards.map((card) => {
        if (card.id === action.id) {
          return { ...card, columnName: action.column };
        } else {
          return card;
        }
      });
    }
    default:
      throw Error("Unknown action: " + action);
  }
}

type CardProviderProps = {
  children: React.ReactNode;
};

export function CardProvider({ children }: CardProviderProps) {
  const [cards, dispatch] = useReducer(reducer, INITIAL_CARDS);

  return (
    <CardContext.Provider value={cards}>
      <CardDispatchContext.Provider value={dispatch}>
        {children}
      </CardDispatchContext.Provider>
    </CardContext.Provider>
  );
}
