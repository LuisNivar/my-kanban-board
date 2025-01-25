import { useContext } from "react";
import { SidebarContext } from "../../Context";
import BoardShortCut from "./BoardShortCut";

export default function HomeContent() {
  const sidebar = useContext(SidebarContext);
  return (
    <div className="w-fit max-w-[600px] lg:max-w-[900px] rounded-lg text-base flex flex-col gap-2 p-5 bg-neutral-750">
      <h3 className="text-lg">📝 My Boards</h3>
      <div className="flex gap-2 overflow-x-auto">
        {sidebar.map((board) => {
          const { background, name, path, icon } = board;
          return (
            <BoardShortCut
              background={background}
              name={name}
              path={path}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
}
