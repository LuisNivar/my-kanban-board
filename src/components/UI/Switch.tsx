import * as SwitchPrimitive from "@radix-ui/react-switch";
import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";

export type SwitchProps = SwitchPrimitive.SwitchProps & {
  color: "teal" | "red" | "yellow" | "blue" | "green";
};

const Switch = forwardRef(
  ({ color, ...props }: SwitchProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const isTeal = color === "teal";
    const isRed = color === "red";
    const isYellow = color === "yellow";
    const isBlue = color === "blue";
    const isGreen = color === "green";

    return (
      <SwitchPrimitive.Root
        className={clsx(
          "group relative disabled:cursor-default h-[25px] w-[44px] cursor-pointer rounded-full bg-neutral-600 disabled:bg-neutral-740 outline-none",
          isTeal && "data-[state=checked]:bg-teal-600",
          isRed && "data-[state=checked]:bg-red-600",
          isYellow && "data-[state=checked]:bg-amber-600",
          isBlue && "data-[state=checked]:bg-blue-600",
          isGreen && "data-[state=checked]:bg-emerald-600"
        )}
        ref={ref}
        {...props}
      >
        <SwitchPrimitive.Thumb className="block group-disabled:bg-neutral-500 size-[19px] translate-x-1 rounded-full bg-neutral-100  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[21px]" />
      </SwitchPrimitive.Root>
    );
  }
);
export default Switch;
