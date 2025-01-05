import { useEffect, useReducer, useState } from "react";
import { CardContext, CardDispatchContext, EMPTY_BOARD } from "./Context";
import { ActionsType, BoardProps, ItemProps } from "./types";

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

function reducer(state: BoardProps, action: ActionsType): BoardProps {
  switch (action.type) {
    case "add": {
      const { board, newCard } = action;
      return {
        ...state,
        [board]: [...(state[board] || []), newCard],
      };
    }
    case "delete": {
      const { board, id } = action;
      return {
        ...state,
        [board]: (state[board] || []).filter((c) => c.id !== id),
      };
    }
    case "move": {
      const { board, column, id } = action;
      return {
        ...state,
        [board]: state[board].map((card) => {
          if (card.id === id) {
            return { ...card, columnName: column };
          } else {
            return card;
          }
        }),
      };
    }
    case "updateTags": {
      const { board, tags, id } = action;
      return {
        ...state,
        [board]: state[board].map((card) => {
          if (card.id === id) {
            return { ...card, tags: tags };
          } else {
            return card;
          }
        }),
      };
    }
    case "updateText": {
      const { board, description, id } = action;
      return {
        ...state,
        [board]: state[board].map((card) => {
          if (card.id === id) {
            return { ...card, description: description };
          } else {
            return card;
          }
        }),
      };
    }
    case "updateItemsBoard": {
      const { board, cards } = action;
      if (!cards) state;
      return { ...state, [board]: [...(cards || [])] };
    }
    case "updateBoards": {
      const { boards } = action;
      return boards;
    }
    case "update": {
      const { board, value } = action;
      return {
        ...state,
        [board]: state[board].map((card) => {
          if (card.id === action.id) {
            return { id: action.id, ...value };
          } else {
            return card;
          }
        }),
      };
    }
    case "addBoard": {
      const { board } = action;
      return {
        ...state,
        [board]: [],
      };
    }
    default:
      throw Error("Unknown action: " + action);
  }
}

type CardProviderProps = {
  children: React.ReactNode;
};

export function CardProvider({ children }: CardProviderProps) {
  const [board, dispatch] = useReducer(reducer, EMPTY_BOARD);
  const [hasChecked, setHasChecked] = useState(false);

  // UPDATE LocalStorage
  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem("board", JSON.stringify(board));
    }
  }, [board]);

  // INITIALIZE Boards
  useEffect(() => {
    const boardLoad = localStorage.getItem("board");
    const initBoard: BoardProps = boardLoad
      ? JSON.parse(boardLoad)
      : EMPTY_BOARD;

    dispatch({
      type: "updateBoards",
      boards: initBoard,
    });
    setHasChecked(true);
  }, []);

  return (
    <CardContext.Provider value={board}>
      <CardDispatchContext.Provider value={dispatch}>
        {children}
      </CardDispatchContext.Provider>
    </CardContext.Provider>
  );
}
