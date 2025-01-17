import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren } from "react";
import { GoCheck as CheckIcon } from "react-icons/go";

function DropdownMenu({ children }: PropsWithChildren) {
  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>;
}

export type OptionProps = DropdownMenuPrimitive.DropdownMenuItemProps & {
  variant: "default" | "danger";
};

function Separator() {
  return (
    <DropdownMenuPrimitive.Separator className="m-1 h-[1px] bg-neutral-700" />
  );
}

function Item({ children, variant, ...props }: OptionProps) {
  const styleDefault =
    "gap-2 transition-colors text-neutral-300 group flex select-none items-center rounded-md px-3 py-2 text-sm leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[disabled]:text-neutral-500 data-[highlighted]:text-neutral-100";

  const styleDanger =
    "gap-2 transition-colors text-red-400 group flex select-none items-center rounded-md px-3 py-2 text-sm leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-800/20 data-[disabled]:text-neutral-500 data-[highlighted]:text-red-300";

  return (
    <DropdownMenuPrimitive.Item
      className={variant === "danger" ? styleDanger : styleDefault}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export type CheckboxItemProps =
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & {
    label: string;
  };

function CheckboxItem({ label, ...props }: CheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className="gap-2 transition-colors text-neutral-300 group flex select-none items-center rounded-md px-6 py-2 text-sm leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[disabled]:text-neutral-500 data-[highlighted]:text-neutral-100"
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="absolute left-3">
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
      {label}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function Trigger({ children }: PropsWithChildren) {
  return (
    <DropdownMenuPrimitive.Trigger>{children}</DropdownMenuPrimitive.Trigger>
  );
}

function Content({ children }: PropsWithChildren) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className="min-w-[220px] rounded-lg flex flex-col gap-0.5 border-neutral-600 bg-neutral-800 border px-2 py-2 shadow-[0_2px_10px] shadow-black/60 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        sideOffset={5}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

function SubMenu({ children }: PropsWithChildren) {
  return <DropdownMenuPrimitive.Sub>{children}</DropdownMenuPrimitive.Sub>;
}

function SubContent({ children }: PropsWithChildren) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        className="min-w-fit rounded-lg flex flex-col gap-0.5 border-neutral-600 shadow-[0_2px_10px] shadow-black/60 bg-neutral-800 border px-2 py-2  will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        sideOffset={2}
        alignOffset={-5}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  );
}

function SubTrigger({ children }: PropsWithChildren) {
  return (
    <DropdownMenuPrimitive.SubTrigger className="group relative flex px-3 py-2 select-none items-center rounded-md pl-8 pr-1 text-sm leading-none text-neutral-300 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[highlighted]:data-[state=open]:bg-neutral-700/60 data-[state=open]:bg-teal-400/10 data-[disabled]:text-neutral-500 data-[highlighted]:data-[state=open]:text-neutral-100 data-[highlighted]:text-neutral-100 data-[state=open]:text-teal-200">
      {children}
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export default Object.assign(DropdownMenu, {
  Item,
  CheckboxItem,
  Trigger,
  Content,
  Separator,
  SubMenu,
  SubContent,
  SubTrigger,
});
