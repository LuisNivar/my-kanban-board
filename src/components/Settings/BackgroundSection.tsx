import { PropsWithChildren, useEffect, useState } from "react";
import { BackgroundToggleProps } from "../../types";
import { BackgrounIcon } from "../Icons";
import Switch from "../UI/Switch";
import { Sections } from "./Sections";
import SelectBoards from "./SelectBoards";
import { BACKGROUNDS_COLLECTION } from "./utils";

export default function BackgrounbdSection() {
  const [state, setState] = useState(BACKGROUNDS_COLLECTION);
  const [selection, setSelection] = useState<string | null>();
  const [selectValue, setSelectValue] = useState<string | null>();

  const [showBg, setShowBg] = useState(false);

  //DEBUG:
  useEffect(() => {
    console.log(selection);
  }, [selection]);

  useEffect(() => {
    console.log(selectValue);
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

  useEffect(() => {
    handleShow();
  }, [showBg]);

  function handleShow() {
    setState((prevState) => {
      return prevState.map((b) => {
        return { ...b, disable: !b.disable };
      });
    });
    //TODO: Do better
    setSelection("bg-neutral-900");
  }

  return (
    <Sections title="Customization" icon={<BackgrounIcon />}>
      <div className="text-neutral-400">
        <div className="flex gap-5 flex-col">
          <fieldset className="h-8 flex justify-between items-center gap-2">
            <label htmlFor="select">Apply to</label>
            <SelectBoards onValueChange={setSelectValue} />
          </fieldset>
          <fieldset className="h-8 flex justify-between items-center gap-2">
            <label htmlFor="show">Show background</label>
            <Switch
              color="yellow"
              id="show"
              checked={showBg}
              onCheckedChange={setShowBg}
            />
          </fieldset>

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
        </div>
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
