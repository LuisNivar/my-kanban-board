import { SelectProps } from "@radix-ui/react-select";
import Select from "../UI/Select";
import { useContext } from "react";
import { SidebarContext } from "../../Context";
import { ICON_DICTIONARY } from "../Sidebar/utils";

export default function SelectBoards({ ...props }: SelectProps) {
  const sidebar = useContext(SidebarContext);

  return (
    <Select {...props} ariaLabel="Boards" placeholder="Seect a board...">
      <Select.Content>
        {sidebar.map((item) => (
          <Select.SelectItem key={item.icon} value={item.name}>
            <span className="flex items-center gap-2">
              {ICON_DICTIONARY[item.icon]} {item.name}
            </span>
          </Select.SelectItem>
        ))}
      </Select.Content>
    </Select>
  );
}
