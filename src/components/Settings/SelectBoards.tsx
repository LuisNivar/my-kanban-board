import { SelectProps } from "@radix-ui/react-select";
import Select from "../UI/Select";
import { useContext } from "react";
import { SidebarContext } from "../../Context";
import { ICON_DICTIONARY } from "../Sidebar/utils";

export default function SelectBoards({ ...props }: SelectProps) {
  const sidebar = useContext(SidebarContext);

  return (
    <Select {...props} ariaLabel="Boards" placeholder="Select a board...">
      <Select.Content>
        {sidebar.map((item) => (
          <Select.Item key={item.icon} value={item.id}>
            <span className="flex items-center gap-2">
              {ICON_DICTIONARY[item.icon]} {item.name}
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
