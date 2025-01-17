import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React, { ForwardedRef } from "react";

type TooltipProps = TooltipPrimitive.TooltipProps & { text: string };
const Tooltip = React.forwardRef(
  (
    { children, text, ...props }: TooltipProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root {...props}>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              className="z-50 select-none rounded border border-neutral-600 bg-neutral-900 px-3 py-2.5 text-xs leading-none shadow-[0_2px_10px] shadow-black/60 will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
              sideOffset={5}
              ref={ref}
            >
              {text}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

export default Tooltip;
