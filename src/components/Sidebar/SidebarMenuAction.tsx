import React from "react";
import { SettingIcon, TrashIcon } from "../Icons";
import ContextMenu, { ContextMenuProps, ItemProps } from "../UI/ContextMenu";
import clsx from "clsx";

type SiSidebarMenuActionProps = ContextMenuProps & {
  onDelete: () => void;
  onEdit: () => void;
};
export function SidebarMenuAction({
  children,
  onDelete,
  onEdit,
  ...props
}: SiSidebarMenuActionProps) {
  return (
    <ContextMenu {...props}>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <Actions
          variant="default"
          label="Sidebar setup..."
          icon={<SettingIcon />}
          onClick={() => onEdit()}
        />
        <Actions
          variant="danger"
          label="Delete"
          icon={<TrashIcon />}
          onClick={() => onDelete()}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

type ActionsProps = ItemProps & { label: string; icon?: React.ReactNode };
function Actions({ label, icon, variant, ...props }: ActionsProps) {
  return (
    <ContextMenu.Item variant={variant} {...props}>
      <button
        className={clsx("flex items-center gap-2 w-full", !icon && "ml-6")}
      >
        {icon} <span>{label}</span>
      </button>
    </ContextMenu.Item>
  );
}
