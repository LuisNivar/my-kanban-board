import clsx from "clsx";
import { BackgroundToggleProps } from "../../../types";

export default function BackgroundToggle({
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
