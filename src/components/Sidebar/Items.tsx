import { nanoid } from "nanoid";
import { SideBarItemLink } from "../../types";
import { LinkItem } from "./LinkItem";
import { SidebarMenuAction } from "./SidebarMenuAction";
import Tooltip from "../UI/Tooltip";
import { ForwardPropsToChild } from "../UI/ForwardPropsToChild";
import { useContext, useState } from "react";
import { SidebarDispatchContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog";

type itemsProps = { state: SideBarItemLink[] };
export default function Items({ state }: itemsProps) {
  return (
    <>
      {state.map((item) => (
        <Item key={nanoid()} {...item} />
      ))}
    </>
  );
}

function Item(props: SideBarItemLink) {
  const { name, icon, path } = props;
  const dispatch = useContext(SidebarDispatchContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  //TODO: Elevate DeleteDialog
  function handleDelete() {
    setOpen(true);
  }

  function Delete() {
    dispatch({ type: "delete", icon });
  }

  function handleEdit() {
    navigate("/settings");
  }

  return (
    <>
      <SidebarMenuAction onDelete={handleDelete} onEdit={handleEdit}>
        <ForwardPropsToChild>
          <Tooltip text={name}>
            <LinkItem to={path} icon={icon} name={name} />
          </Tooltip>
        </ForwardPropsToChild>
      </SidebarMenuAction>

      <DeleteDialog
        onConfirm={() => Delete()}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
