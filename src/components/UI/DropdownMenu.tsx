import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren } from "react";

function DropdownMenu({ children }: PropsWithChildren) {
  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>;
}

export type OptionsProps = PropsWithChildren<{ variant: "default" | "danger" }>;
function Options({ children, variant }: OptionsProps) {
  const styleDefault =
    "gap-2 text-neutral-300 group flex select-none items-center rounded px-3 py-2 text-base leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[disabled]:text-neutral-600 data-[highlighted]:text-neutral-100";

  const styleDanger =
    "gap-2 text-red-400 group flex select-none items-center rounded px-3 py-2 text-base leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-rose-500/10 data-[disabled]:text-neutral-600 data-[highlighted]:text-red-300";

  return (
    <DropdownMenuPrimitive.Item
      className={variant === "danger" ? styleDanger : styleDefault}
    >
      {children}
    </DropdownMenuPrimitive.Item>
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
        className="min-w-[220px] rounded flex flex-col gap-0.5 border-neutral-600 bg-neutral-800 border px-2 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        sideOffset={5}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export default Object.assign(DropdownMenu, {
  Options,
  Trigger,
  Content,
});
