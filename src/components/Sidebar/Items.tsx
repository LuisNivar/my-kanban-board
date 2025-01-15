import { nanoid } from "nanoid";
import { SideBarItemLink } from "../../types";
import { LinkItem } from "./LinkItem";
import { SidebarMenuAction } from "./SidebarMenuAction";
import Tooltip from "../UI/Tooltip";
import { ForwardPropsToChild } from "../UI/ForwardPropsToChild";
import { useContext } from "react";
import { SidebarDispatchContext } from "../../Context";
import { useNavigate } from "react-router-dom";

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

  //TODO: Add Delet confimation
  function handleDelete() {
    dispatch({ type: "delete", icon });
  }

  function handleEdit() {
    navigate("/settings");
  }

  return (
    <SidebarMenuAction onDelete={handleDelete} onEdit={handleEdit}>
      <ForwardPropsToChild>
        <Tooltip text={name}>
          <LinkItem to={path} icon={icon} name={name} />
        </Tooltip>
      </ForwardPropsToChild>
    </SidebarMenuAction>
  );
}
