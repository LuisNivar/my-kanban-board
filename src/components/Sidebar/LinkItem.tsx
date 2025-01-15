import React, { ForwardedRef } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { ICON_DICTIONARY } from "./utils";

type LinkItemProps = LinkProps & {
  icon: string;
  name: string;
};

export const LinkItem = React.forwardRef(
  (
    { icon, name, ...props }: LinkItemProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    //FIXME: Highlight
    const { pathname } = useLocation();
    const isActive = pathname.includes(name);

    return (
      <Link
        ref={ref}
        className={`transition-colors rounded-lg p-2.5 ${
          isActive
            ? "text-neutral-100 bg-teal-700 hover:bg-teal-600"
            : "text-neutral-400  hover:bg-neutral-700/60"
        }  `}
        {...props}
      >
        {ICON_DICTIONARY[icon]}
      </Link>
    );
  }
);
