import { useEffect, useState } from "react";
import { ActionsSidebarType, SideBarItemLink } from "../../../types";
import {
  BACKGROUNDS_COLLECTION,
  backgroundToggle,
  DEFAULT_BACKGROUND,
} from ".././utils";

interface BackgroundSelectorProps {
  backgrounds: backgroundToggle[];
  selectedBoard: string | null;
  sidebar: SideBarItemLink[];
  dispatch: React.Dispatch<ActionsSidebarType>;
}

const useBackgroundSelector = ({
  selectedBoard,
  sidebar,
  dispatch,
}: BackgroundSelectorProps) => {
  const [backgrounds, setBackgrounds] = useState(BACKGROUNDS_COLLECTION);
  const [showBackgrounds, setShowBackgrounds] = useState(false);

  useEffect(() => {
    if (!selectedBoard) {
      reset();
      return;
    }

    const currBackround = sidebar.find(
      (b) => b.id === selectedBoard
    )?.background;

    if (!currBackround || currBackround === DEFAULT_BACKGROUND) {
      reset();
      return;
    }

    const backgroundId =
      backgrounds.find((b) => b.value === currBackround)?.key ?? "default";

    handleSelectionChange(backgroundId);
    handleDisable(false);
    setShowBackgrounds(true);
  }, [selectedBoard]);

  useEffect(() => {
    handleDisable(!showBackgrounds);

    if (!showBackgrounds && selectedBoard) {
      dispatch({
        type: "backgroundChange",
        boardId: selectedBoard,
        background: DEFAULT_BACKGROUND,
      });
    }
  }, [showBackgrounds]);

  const reset = () => {
    setBackgrounds(BACKGROUNDS_COLLECTION);
    handleDisable(true);
    setShowBackgrounds(false);
  };

  function handleDisable(value: boolean) {
    setBackgrounds((prevState) => {
      return prevState.map((b) => {
        return { ...b, disable: value };
      });
    });
  }

  const handleSelectionChange = (key: string) => {
    const background = backgrounds.find((b) => b.key === key);
    if (!background || !selectedBoard) {
      return;
    }

    setBackgrounds((prevState) => {
      return prevState.map((bg) => {
        if (bg.key === key) {
          return { ...bg, toggled: true };
        } else {
          return { ...bg, toggled: false };
        }
      });
    });

    dispatch({
      type: "backgroundChange",
      boardId: selectedBoard,
      background: background.value,
    });
  };

  return {
    showBackgrounds,
    setShowBackgrounds,
    handleSelectionChange,
    backgrounds,
  };
};

export default useBackgroundSelector;
