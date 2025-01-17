import * as SwitchPrimitive from "@radix-ui/react-switch";
import { ForwardedRef, forwardRef } from "react";

export type SwitchProps = SwitchPrimitive.SwitchProps & {
  color: "teal" | "red" | "amber" | "blue" | "green";
};

const Switch = forwardRef(
  ({ color, ...props }: SwitchProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const checkColor = `data-[state=checked]:bg-${color}-600`;
    return (
      <SwitchPrimitive.Root
        className={`relative h-[25px] w-[44px] cursor-default rounded-full bg-neutral-600 outline-none ${checkColor}`}
        ref={ref}
        {...props}
      >
        <SwitchPrimitive.Thumb className="block size-[19px] translate-x-1 rounded-full bg-neutral-100  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[21px]" />
      </SwitchPrimitive.Root>
    );
  }
);
export default Switch;
