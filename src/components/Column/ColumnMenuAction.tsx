import { PropsWithChildren } from "react";
import { EditIcon, TrashIcon } from "../Icons";
import { Action } from "../MenuAction";
import DropdownMenu from "../UI/DropdownMenu";

type MenuActionProps = PropsWithChildren & {
  onDelete: () => void;
  onEdit: () => void;
};

export function MenuAction({ children, onDelete, onEdit }: MenuActionProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Action
            onClick={() => onEdit()}
            icon={<EditIcon />}
            label="Edit"
            variant="default"
          />
          <Action
            onClick={() => onDelete()}
            icon={<TrashIcon />}
            label="Delete"
            variant="danger"
          />
        </DropdownMenu.Content>
      </DropdownMenu>
    </>
  );
}
