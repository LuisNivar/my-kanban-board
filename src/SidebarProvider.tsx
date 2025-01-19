import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import {
  SIDEBAR_STATE,
  SidebarContext,
  SidebarDispatchContext,
} from "./Context";
import { ActionsSidebarType, SideBarItemLink } from "./types";

function reducer(
  state: SideBarItemLink[],
  action: ActionsSidebarType
): SideBarItemLink[] {
  switch (action.type) {
    case "add": {
      return [...state, action.itemLink];
    }
    case "updateAll": {
      return action.state;
    }
    case "rename": {
      return state.map((b) => {
        if (b.icon === action.icon) {
          return { ...b, name: action.newName };
        } else {
          return b;
        }
      });
    }
    case "delete": {
      return state.filter((b) => b.icon !== action.icon);
    }
    case "backgroundChange": {
      return state.map((b) => {
        if (b.icon === action.icon) {
          return { ...b, background: action.background };
        } else {
          return b;
        }
      });
    }
  }
}

type SidebarProviderProps = PropsWithChildren;

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [state, dispatch] = useReducer(reducer, SIDEBAR_STATE);
  const [hasChecked, setHasChecked] = useState(false);

  //INITIALIZE SidebarState
  useEffect(() => {
    const sidebarLoaded = localStorage.getItem("sidebar");
    const initState: SideBarItemLink[] = sidebarLoaded
      ? JSON.parse(sidebarLoaded)
      : SIDEBAR_STATE;

    dispatch({
      type: "updateAll",
      state: initState,
    });
    setHasChecked(true);
  }, []);

  //UPDATE LocalStorage
  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem("sidebar", JSON.stringify(state));
    }
  }, [state]);

  return (
    <SidebarContext.Provider value={state}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarContext.Provider>
  );
}
