import { Link } from "react-router-dom";
import { GitHubIcon, WorkIcon } from "../Icons";

export default function Footer() {
  return (
    <footer className="absolute rounded-md mb-3 bg-neutral-850 pl-5 pr-3 flex items-center justify-between bottom-0 py-2 lg:w-[900px] w-[600px] text-neutral-600">
      By Luis Nivar • 2025
      <span className="flex items-center gap-1">
        <a
          href="https://github.com/LuisNivar"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center text-xl size-10 rounded-full hover:bg-neutral-800/80 transition-all hover:scale-110 hover:text-teal-500"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://portfolio-luis-nivar.vercel.app"
          target="_blank"
          className="flex items-center justify-center text-xl size-10 rounded-full hover:bg-neutral-800/80 transition-all hover:scale-110 hover:text-teal-500"
        >
          <WorkIcon />
        </a>
      </span>
    </footer>
  );
}
