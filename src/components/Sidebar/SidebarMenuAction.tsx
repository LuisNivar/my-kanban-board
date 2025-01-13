import { PropsWithChildren } from "react";
import ContextMenu from "../UI/ContextMenu";

export function SidebarMenuAction({ children }: PropsWithChildren) {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item variant="default">Test</ContextMenu.Item>
        <ContextMenu.Item variant="danger">Remove</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}
