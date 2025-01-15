import ContextMenu, { ContextMenuProps } from "../UI/ContextMenu";

export function SidebarMenuAction({ children, ...props }: ContextMenuProps) {
  return (
    <ContextMenu {...props}>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item variant="default">Test</ContextMenu.Item>
        <ContextMenu.Item variant="danger">Remove</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}
