import { PropsWithChildren } from "react";
import DropdownMenu from "./UI/DropdownMenu";
import { GoTrash as TrashIcon } from "react-icons/go";
import { GrEdit as EditIcon } from "react-icons/gr";

export function MenuAction({ children }: PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <CardOptions />
    </DropdownMenu>
  );
}

function CardOptions() {
  return (
    <DropdownMenu.Content>
      <DropdownMenu.Options variant="default">
        <EditIcon /> <button onClick={() => alert("Edit")}>Edit</button>
      </DropdownMenu.Options>
      <DropdownMenu.Options variant="danger">
        <TrashIcon /> Delete
      </DropdownMenu.Options>
    </DropdownMenu.Content>
  );
}
