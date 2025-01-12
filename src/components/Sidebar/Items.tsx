import { nanoid } from "nanoid";
import { SideBarItemLink } from "../../types";
import LinkItem from "./LinkItem";

type itemsProps = { state: SideBarItemLink[] };
export default function Items({ state }: itemsProps) {
  return (
    <>
      {state.map((item) => (
        <LinkItem
          key={nanoid()}
          to={item.path}
          icon={item.icon}
          name={item.name}
        />
      ))}
    </>
  );
}
