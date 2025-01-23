import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarDispatchContext } from "../../Context";
import { SideBarItemLink } from "../../types";
import DeleteDialog from "../DeleteDialog";
import { ForwardPropsToChild } from "../UI/ForwardPropsToChild";
import Tooltip from "../UI/Tooltip";
import { LinkItem } from "./LinkItem";
import { SidebarMenuAction } from "./SidebarMenuAction";

const dataTransfer = new DataTransfer();

type itemsProps = { state: SideBarItemLink[] };
export default function Items({ state }: itemsProps) {
  const dispatch = useContext(SidebarDispatchContext);
  const [open, setOpen] = useState(false);

  function Delete() {
    const id = dataTransfer.getData("id");
    dispatch({ type: "delete", id });
  }

  return (
    <>
      {state.map((item) => (
        <Item onOpen={setOpen} key={nanoid()} {...item} />
      ))}
      <DeleteDialog onConfirm={Delete} open={open} onOpenChange={setOpen} />
    </>
  );
}

type ItemsProps = SideBarItemLink & {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function Item(props: ItemsProps) {
  const { name, id, icon, path, onOpen } = props;

  const navigate = useNavigate();

  function handleDelete() {
    dataTransfer.setData("id", id);
    onOpen(true);
  }

  function handleEdit() {
    navigate("/settings");
  }

  return (
    <>
      <SidebarMenuAction onDelete={handleDelete} onEdit={handleEdit}>
        <ForwardPropsToChild>
          <Tooltip text={name}>
            <LinkItem to={path} id={id} icon={icon} name={name} />
          </Tooltip>
        </ForwardPropsToChild>
      </SidebarMenuAction>
    </>
  );
}
