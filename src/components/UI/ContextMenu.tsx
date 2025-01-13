import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

type ContextMenuProps = ContextMenuPrimitive.ContextMenuProps;
function ContextMenu({ children, ...props }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
  );
}

function Content({
  children,
  ...props
}: ContextMenuPrimitive.ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className="min-w-[220px] rounded-lg flex flex-col gap-0.5 border-neutral-600 bg-neutral-800 border px-2 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
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

type ItemProps = ContextMenuPrimitive.ContextMenuItemProps & {
  variant: "default" | "danger";
};
function Item({ children, variant, ...props }: ItemProps) {
  const styleDefault =
    "gap-2 transition-colors text-neutral-300 group flex select-none items-center rounded-md px-3 py-2 text-sm leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[disabled]:text-neutral-500 data-[highlighted]:text-neutral-100";

  const styleDanger =
    "gap-2 transition-colors text-red-400 group flex select-none items-center rounded-md px-3 py-2 text-sm leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-800/20 data-[disabled]:text-neutral-500 data-[highlighted]:text-red-300";

  return (
    <ContextMenuPrimitive.Item
      {...props}
      className={variant === "danger" ? styleDanger : styleDefault}
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
