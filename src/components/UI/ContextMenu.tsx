import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import clsx from "clsx";

export type ContextMenuProps = ContextMenuPrimitive.ContextMenuProps;
function ContextMenu({ children, ...props }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
  );
}

type ContentProps = ContextMenuPrimitive.ContextMenuContentProps;
function Content({ children, ...props }: ContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className="z-30 min-w-[220px] rounded-lg flex flex-col gap-0.5 border-neutral-600 bg-neutral-800 border px-2 py-2 shadow-[0_2px_10px] shadow-black/60 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        {...props}
      >
        {children}
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
}

function Trigger({
  children,
  ...props
}: ContextMenuPrimitive.ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger {...props}>
      {children}
    </ContextMenuPrimitive.Trigger>
  );
}

export type ItemProps = ContextMenuPrimitive.ContextMenuItemProps & {
  variant: "default" | "danger";
};
function Item({ children, variant, ...props }: ItemProps) {
  const isDanger = variant === "danger";
  const isDefault = variant === "default";

  return (
    <ContextMenuPrimitive.Item
      {...props}
      className={clsx(
        "group gap-2 transition-colors flex select-none  data-[disabled]:text-neutral-500  data-[disabled]:pointer-events-none rounded-md px-3 py-2 text-sm leading-none outline-none",
        isDanger &&
          "text-red-400  data-[highlighted]:bg-red-800/20 data-[highlighted]:text-red-300",
        isDefault &&
          "text-neutral-300 data-[highlighted]:bg-neutral-700/60  data-[highlighted]:text-neutral-100"
      )}
    >
      {children}
    </ContextMenuPrimitive.Item>
  );
}

function Separator() {
  return (
    <ContextMenuPrimitive.Separator className="m-1 h-[1px] bg-neutral-700" />
  );
}

export default Object.assign(ContextMenu, {
  Trigger,
  Item,
  Content,
  Separator,
});
