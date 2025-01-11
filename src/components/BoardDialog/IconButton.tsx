import { IconToggleProps } from "../../types";

export function IconButton({
  icon,
  id,
  used,
  active,
  onChange,
}: IconToggleProps) {
  function handeleChange() {
    onChange(id);
  }

  return (
    <button
      disabled={used}
      className={`flex disabled:text-neutral-600 disabled:hover:bg-neutral-700/50 hover:bg-neutral-700 text-[22px] text-neutral-300 items-center p-3 justify-center bg-neutral-700/50 rounded-lg 
      ${
        active && "bg-teal-700 hover:bg-teal-600 text-neutral-100 font-medium"
      }`}
      onClick={() => handeleChange()}
    >
      {icon}
    </button>
  );
}
