import { useEffect, useReducer, useState } from "react";
import { CardContext, CardDispatchContext } from "./Context";
import { ActionsType, ItemProps } from "./types";

//TODO: Create tutorials cars
const INITIAL_CARDS: ItemProps[] = [
  {
    title: "Title 1",
    description: "Something to do...",
    columnName: "backlog",
    id: "1",
    date: "12/16/2024",
    tags: {
      red: true,
      yellow: false,
      green: false,
      blue: false,
    },
  },
  {
    title: "Title 1",
    description: "Another thing to do...",
    columnName: "todo",
    id: "2",
    date: "12/16/2024",
    tags: {
      red: false,
      yellow: true,
      green: false,
      blue: false,
    },
  },
  {
    title: "Title 1",
    description: "A thing to figure out..",
    columnName: "todo",
    id: "6",
    date: "12/17/2024",
    tags: {
      red: true,
      yellow: true,
      green: true,
      blue: false,
    },
  },
  {
    title: "Title 1",
    description: "A stuff to solve...",
    columnName: "in-progress",
    id: "3",
    date: "12/17/2024",
    tags: {
      red: true,
      yellow: false,
      green: true,
      blue: true,
    },
  },
  {
    title: "Title 1",
    description: "A real thing to try",
    columnName: "backlog",
    id: "4",
    date: "12/18/2024",
    tags: {
      red: false,
      yellow: false,
      green: true,
      blue: false,
    },
  },
  {
    title: "Title 1",
    description: "Some foods to taste...",
    columnName: "complete",
    id: "5",
    date: "12/14/2024",
    tags: {
      red: true,
      yellow: false,
      green: true,
      blue: false,
    },
  },
];

function reducer(cards: ItemProps[], action: ActionsType) {
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
    case "updateTags": {
      return cards.map((card) => {
        if (card.id === action.id) {
          return { ...card, tags: action.tags };
        } else {
          return card;
        }
      });
    }
    case "updateText": {
      return cards.map((card) => {
        if (card.id === action.id) {
          return { ...card, description: action.description };
        } else {
          return card;
        }
      });
    }
    case "updateAll": {
      return [...action.cards];
    }

    default:
      throw Error("Unknown action: " + action);
  }
}

type CardProviderProps = {
  children: React.ReactNode;
};

export function CardProvider({ children }: CardProviderProps) {
  const [cards, dispatch] = useReducer(reducer, []);
  const [hasChecked, setHasChecked] = useState(false);

  // UPDATE LocalStorage
  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  // INITIALIZE Cards
  useEffect(() => {
    const cardsLoads = localStorage.getItem("cards");
    const initCard = cardsLoads ? JSON.parse(cardsLoads) : [];

    dispatch({
      type: "updateAll",
      cards: initCard,
    });
    setHasChecked(true);
  }, []);

  return (
    <CardContext.Provider value={cards}>
      <CardDispatchContext.Provider value={dispatch}>
        {children}
      </CardDispatchContext.Provider>
    </CardContext.Provider>
  );
}
