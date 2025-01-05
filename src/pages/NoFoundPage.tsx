import { Link } from "react-router-dom";
import { IoMdArrowRoundBack as BackIcon } from "react-icons/io";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-neutral-900  w-full px-36 text-neutral-400">
      <h1 className="font-semibold text-[200px] leading-none text-teal-500">
        404
      </h1>
      <span className="text-xl mb-12">The page isn't found.</span>

      <Link
        to={"/"}
        className="flex items-center gap-2 transition-colors font-semibold rounded-lg px-4 py-2 hover:bg-neutral-300 bg-neutral-100 text-neutral-800"
      >
        <BackIcon />
        Go back
      </Link>
    </div>
  );
}
