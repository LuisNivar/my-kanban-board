import { useContext, useState } from "react";
import { SidebarContext } from "../../Context";
import { getIconState } from "./utils";
import { IconToggle } from "../../types";
import { IconButton } from "./IconButton";

type IconsGroupProps = {
  onSelection: React.Dispatch<React.SetStateAction<IconToggle | null>>;
};

export function IconsGroup({ onSelection }: IconsGroupProps) {
  const sidebarState = useContext(SidebarContext);
  const [state, setState] = useState(getIconState(sidebarState));

  function handleChange(key: string) {
    const iconButton = state.filter((t) => t.key === key)[0];
    onSelection(iconButton);

    setState((prevState) => {
      return prevState.map((t) => {
        if (t.key === key) {
          return { ...t, toogled: !t.toogled };
        } else {
          return { ...t, toogled: false };
        }
      });
    });
  }
  return (
    <>
      {state.map((i) => {
        return (
          <IconButton
            onChange={handleChange}
            key={i.key}
            id={i.key}
            icon={i.icon}
            active={i.toogled}
            used={i.used}
          />
        );
      })}
    </>
  );
}
