import { nanoid } from "nanoid";
import LinkItem from "./LinkItem";
import { useContext } from "react";
import { SidebarContext } from "../../Context";

export default function Body() {
  const state = useContext(SidebarContext);
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
