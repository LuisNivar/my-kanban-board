import { useEffect, useReducer, useState } from "react";
import { CardContext, CardDispatchContext, EMPTY_BOARD } from "./Context";
import { ActionsCardsType, BoardProps } from "./types";

//TODO: Create tutorials cars

function reducer(state: BoardProps, action: ActionsCardsType): BoardProps {
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
    const boardLoaded = localStorage.getItem("board");
    const initBoard: BoardProps = boardLoaded
      ? JSON.parse(boardLoaded)
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
