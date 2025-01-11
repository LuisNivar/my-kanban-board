import { Link, LinkProps, useLocation } from "react-router-dom";
import Tooltip from "../UI/Tooltip";
import { ICON_DICTIONARY } from "./utils";

type LinkItemProps = LinkProps & {
  icon: string;
  name: string;
};

export default function LinkItem({ icon, name, ...props }: LinkItemProps) {
  const { pathname } = useLocation();
  //FIXME:
  const isActive = pathname.includes(name);

  return (
    <Tooltip text={name}>
      <Link
        {...props}
        className={`transition-colors rounded-lg p-2.5 ${
          isActive
            ? "text-neutral-100 bg-teal-700 hover:bg-teal-600"
            : "text-neutral-400  hover:bg-neutral-700/60"
        }  `}
      >
        {ICON_DICTIONARY[icon]}
      </Link>
    </Tooltip>
  );
}
