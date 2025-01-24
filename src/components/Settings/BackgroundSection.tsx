import clsx from "clsx";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { SidebarContext, SidebarDispatchContext } from "../../Context";
import { BackgroundToggleProps } from "../../types";
import { BackgrounIcon } from "../Icons";
import Switch from "../UI/Switch";
import { Field } from "./Field";
import { Sections } from "./Sections";
import SelectBoards from "./SelectBoards";
import { BACKGROUNDS_COLLECTION, DEFAULT_BACKGROUND } from "./utils";

export default function BackgrounbdSection() {
  const [backgrounds, setBackgrounds] = useState(BACKGROUNDS_COLLECTION);
  const [selection, setSelection] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [showBackgrounds, setShowBackgrounds] = useState(false);

  const dispatch = useContext(SidebarDispatchContext);
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    handleShow();
  }, [showBackgrounds]);

  // Change background
  useEffect(() => {
    if (!selectedBoard) return;
    if (!selection) return;

    dispatch({
      type: "backgroundChange",
      boardId: selectedBoard,
      background: selection,
    });
  }, [selection]);

  // Set default background
  useEffect(() => {
    if (!selectedBoard) return;
    if (!showBackgrounds) {
      dispatch({
        type: "backgroundChange",
        boardId: selectedBoard,
        background: DEFAULT_BACKGROUND,
      });
    }
  }, [showBackgrounds]);

  // Load background by board
  useEffect(() => {
    const selectedBackground = sidebar.filter((s) => s.id === selectedBoard)[0]
      ?.background;

    if (!selectedBackground) return;
    setShowBackgrounds(selectedBackground !== DEFAULT_BACKGROUND);

    setBackgrounds((prevState) => {
      return prevState.map((b) => {
        if (b.value === selectedBackground) {
          return { ...b, toggled: true };
        } else {
          return { ...b, toggled: false };
        }
      });
    });
  }, [selectedBoard]);

  function handleChange(key: string) {
    const b = backgrounds.filter((b) => b.key === key)[0];
    setSelection(b.value);

    setBackgrounds((prevState) => {
      return prevState.map((b) => {
        if (b.key === key) {
          return { ...b, toggled: !b.toggled };
        } else {
          return { ...b, toggled: false };
        }
      });
    });
  }

  function handleShow() {
    setBackgrounds((prevState) => {
      return prevState.map((b) => {
        return { ...b, disable: !b.disable };
      });
    });
  }

  return (
    <Sections title="Customization" icon={<BackgrounIcon />}>
      <div className="flex gap-5 flex-col text-neutral-400">
        <Field htmlFor="select" label="Apply to">
          <SelectBoards onValueChange={setSelectedBoard} />
        </Field>
        <Field htmlFor="show" label="Show backgrounds aviables">
          <Switch
            color="teal"
            id="show"
            checked={showBackgrounds}
            onCheckedChange={setShowBackgrounds}
            disabled={!selectedBoard}
          />
        </Field>

        <BackgroundsCategory title="Gradients">
          {backgrounds
            .filter((b) => b.type === "gradient")
            .map((b) => (
              <BackgroundToggle
                key={b.key}
                onChange={handleChange}
                background={b.value}
                id={b.key}
                active={b.toggled}
                disable={b.disable}
              />
            ))}
        </BackgroundsCategory>

        <BackgroundsCategory title="Images">
          {backgrounds
            .filter((b) => b.type === "image")
            .map((b) => (
              <BackgroundToggle
                key={b.key}
                onChange={handleChange}
                background={b.value}
                id={b.key}
                active={b.toggled}
                disable={b.disable}
              />
            ))}
        </BackgroundsCategory>
      </div>
    </Sections>
  );
}

type BackgroundsCategoryProps = PropsWithChildren & { title: string };
function BackgroundsCategory({ title, children }: BackgroundsCategoryProps) {
  return (
    <div>
      <h3 className="text-base mb-2">{title}</h3>
      <span className="grid grid-cols-4 gap-3">{children}</span>
    </div>
  );
}

export function BackgroundToggle({
  background,
  id,
  active,
  disable,
  onChange,
}: BackgroundToggleProps) {
  function handeleChange() {
    onChange(id);
  }

  return (
    <button
      className={clsx(
        `bg-cover ${background} relative rounded-md w-16 h-10`,
        active &&
          !disable &&
          "ring-2 ring-offset-4 ring-offset-neutral-800 ring-teal-500",
        disable && "grayscale"
      )}
      onClick={() => handeleChange()}
      disabled={disable}
    >
      {disable && (
        <span className="cursor-not-allowed block absolute top-0  backdrop-blur-[2px] bg-white/10 rounded-md w-16 h-10 " />
      )}
    </button>
  );
}
