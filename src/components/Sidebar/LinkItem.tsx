import clsx from "clsx";
import React, { ForwardedRef } from "react";
import { Link, LinkProps, useParams } from "react-router-dom";
import { ICON_DICTIONARY } from "./utils";

type LinkItemProps = LinkProps & {
  icon: string;
  name: string;
  id: string;
};

export const LinkItem = React.forwardRef(
  (
    { icon, name, id: boardId, ...props }: LinkItemProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    //FIXME: Highlight
    const { id } = useParams();
    const isActive = id === boardId;

    return (
      <Link
        ref={ref}
        className={clsx(
          "transition-colors rounded-lg p-2.5",
          isActive
            ? "text-neutral-100 bg-teal-700 hover:bg-teal-600"
            : "text-neutral-400  hover:bg-neutral-700/60"
        )}
        {...props}
      >
        {ICON_DICTIONARY[icon]}
      </Link>
    );
  }
);
