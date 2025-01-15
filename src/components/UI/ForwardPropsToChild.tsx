import { Slot } from "@radix-ui/react-slot";
import { cloneElement, forwardRef } from "react";

type ForwardPropsToChildProps = {
  children: React.ReactElement;
};

export const ForwardPropsToChild = forwardRef<
  HTMLElement,
  ForwardPropsToChildProps
>(function ForwardPropsToChild({ children, ...props }, ref) {
  const clonedChild = cloneElement(children, {
    children: (
      <Slot ref={ref} {...props}>
        {children.props.children}
      </Slot>
    ),
  });

  return clonedChild;
});
