import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { SidebarContext, SidebarDispatchContext } from "../../Context";
import { BackgroundToggleProps } from "../../types";
import { BackgrounIcon } from "../Icons";
import Switch from "../UI/Switch";
import { Sections } from "./Sections";
import SelectBoards from "./SelectBoards";
import { BACKGROUNDS_COLLECTION, DEFAULT_BACKGROUND } from "./utils";

export default function BackgrounbdSection() {
  const [state, setState] = useState(BACKGROUNDS_COLLECTION);
  const [selection, setSelection] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [showBg, setShowBg] = useState(false);

  const dispatch = useContext(SidebarDispatchContext);
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    handleShow();
  }, [showBg]);

  // Change background
  useEffect(() => {
    if (!selectValue) return;
    if (!selection) return;

    dispatch({
      type: "backgroundChange",
      icon: selectValue,
      background: selection,
    });
  }, [selection]);

  // Set default background
  useEffect(() => {
    if (!selectValue) return;
    if (!showBg) {
      dispatch({
        type: "backgroundChange",
        icon: selectValue,
        background: DEFAULT_BACKGROUND,
      });
    }
  }, [showBg]);

  // Load background by board
  useEffect(() => {
    const selectedBackground = sidebar.filter((s) => s.icon === selectValue)[0]
      ?.background;

    if (!selectedBackground) return;
    setShowBg(selectedBackground !== DEFAULT_BACKGROUND);

    setState((prevState) => {
      return prevState.map((b) => {
        if (b.value === selectedBackground) {
          return { ...b, toggled: true };
        } else {
          return { ...b, toggled: false };
        }
      });
    });
  }, [selectValue]);

  function handleChange(key: string) {
    const b = state.filter((b) => b.key === key)[0];
    setSelection(b.value);

    setState((prevState) => {
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
    setState((prevState) => {
      return prevState.map((b) => {
        return { ...b, disable: !b.disable };
      });
    });
    //TODO: Do better
    setSelection(DEFAULT_BACKGROUND);
  }

  return (
    <Sections title="Customization" icon={<BackgrounIcon />}>
      <Body>
        <Field htmlFor="select" label="Apply to">
          <SelectBoards onValueChange={setSelectValue} />
        </Field>
        <Field htmlFor="show" label="Show backgrounds aviables">
          <Switch
            color="yellow"
            id="show"
            checked={showBg}
            onCheckedChange={setShowBg}
            disabled={!selectValue}
          />
        </Field>

        <BackgroundsCategory title="Gradients">
          {state
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
          {state
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
      </Body>
    </Sections>
  );
}

function Body({ children }: PropsWithChildren) {
  return (
    <div className="text-neutral-400">
      <div className="flex gap-5 flex-col">{children}</div>
    </div>
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

type FieldProps = PropsWithChildren & { label: string; htmlFor: string };
function Field({ children, label, htmlFor }: FieldProps) {
  return (
    <fieldset className="h-8 flex justify-between items-center gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </fieldset>
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
      className={`bg-cover ${background} relative rounded-md w-16 h-10 
      ${
        active &&
        !disable &&
        "ring-2 ring-offset-4 ring-offset-neutral-800 ring-teal-500"
      }
      ${disable && "grayscale"}
      `}
      onClick={() => handeleChange()}
      disabled={disable}
    >
      {disable && (
        <span className="cursor-not-allowed block absolute top-0  backdrop-blur-[2px] bg-white/10 rounded-md w-16 h-10 " />
      )}
    </button>
  );
}
