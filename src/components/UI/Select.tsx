import React, { ForwardedRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../Icons";

type SelectProps = SelectPrimitive.SelectProps & {
  placeholder: string;
  ariaLabel: string;
};
function Select({ children, placeholder, ariaLabel, ...props }: SelectProps) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className="inline-flex h-8 w-52 justify-between border border-neutral-600 items-center gap-1 rounded-md bg-neutral-900 px-4 text-sm leading-none text-neutral-300  outline-none hover:bg-neutral-900/40  data-[placeholder]:text-neutral-400"
        aria-label={ariaLabel}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-base">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      {children}
    </SelectPrimitive.Root>
  );
}

type GroupsProps = SelectPrimitive.SelectGroupProps & { label: string };
function Groups({ children, label, ...props }: GroupsProps) {
  return (
    <SelectPrimitive.Group {...props}>
      <SelectPrimitive.Label className="px-6 py-2 text-sm leading-p-6 text-teal-500">
        {label}
      </SelectPrimitive.Label>
      {children}
    </SelectPrimitive.Group>
  );
}

function Content({ children, ...props }: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        {...props}
        className="overflow-hidden shadow-[0_4px_10px] shadow-black/80 border border-neutral-600 rounded-lg bg-neutral-800"
      >
        <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-neutral-800 hover:bg-teal-500/20 text-teal-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center  bg-neutral-800 hover:bg-teal-500/20 text-teal-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function Separator() {
  return <SelectPrimitive.Separator className="m-1 h-px bg-neutral-500" />;
}

const Item = React.forwardRef(
  (
    { children, ...props }: SelectPrimitive.SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <SelectPrimitive.Item
        className="relative flex select-none items-center rounded-md pl-6 pr-[35px] py-1 text-sm  text-neutral-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[disabled]:text-neutral-500 data-[highlighted]:text-neutral-100 transition-colors outline-none"
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);

export default Object.assign(Select, {
  Content,
  Groups,
  Separator,
  Item,
});
