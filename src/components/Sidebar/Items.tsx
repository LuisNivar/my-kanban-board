import { nanoid } from "nanoid";
import { SideBarItemLink } from "../../types";
import { LinkItem } from "./LinkItem";
import { SidebarMenuAction } from "./SidebarMenuAction";
import Tooltip from "../UI/Tooltip";
import { ForwardPropsToChild } from "../UI/ForwardPropsToChild";

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
  return (
    <SidebarMenuAction>
      <ForwardPropsToChild>
        <Tooltip text={name}>
          <LinkItem to={path} icon={icon} name={name} />
        </Tooltip>
      </ForwardPropsToChild>
    </SidebarMenuAction>
  );
}
