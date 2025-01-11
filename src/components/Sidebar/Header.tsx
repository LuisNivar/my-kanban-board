import { Link } from "react-router-dom";
import Separator from "./Separator";

export default function Header() {
  return (
    <div className="flex gap-3 items-center flex-col">
      <Link
        to={"/"}
        className="cursor-pointer select-none bg-yellow-500 hover:bg-yellow-300 transition-colors text-xs font-medium text-neutral-800 px-2 py-1 rounded-md"
      >
        WIP
      </Link>
      <Separator />
    </div>
  );
}
