import { useContext, useState } from "react";
import { SidebarContext, SidebarDispatchContext } from "../Context";
import { SideBarItemLink } from "../types";
import Dialog, { DialogProps } from "./UI/Dialog";
import {
  BookIcon,
  BoxIcon,
  CalendarIcon,
  CodeIcon,
  DataBaseIcon,
  FolderIcon,
  GameIcon,
  HammerIcon,
  HeartIcon,
  PinIcon,
  StarIcon,
  TrophyIcon,
} from "./Icons";

export function BoardDialog({ children, ...props }: DialogProps) {
  const [selection, setSelection] = useState<IconToggle | null>(null);
  const [name, setName] = useState("");
  const MAX_LENGTH_NAME = 16;
  const dispatch = useContext(SidebarDispatchContext);

  function handleCreate() {
    console.log(selection);
    if (!selection) return;

    console.log(selection.key);

    const newItemLink: SideBarItemLink = {
      name: name,
      icon: selection.key,
      path: `/board/${name}`,
    };

    dispatch({
      type: "add",
      itemLink: newItemLink,
    });
  }

  return (
    <Dialog {...props}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content title="Add new board">
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-neutral-300">Icon</h3>
          <div className="self-center grid grid-cols-4 gap-2">
            <IconsGroup onSelection={setSelection} />
          </div>
          <h3 className="font-medium text-neutral-300">Name</h3>
          <input
            className="w-full inline-flex placeholder:text-neutral-500 py-2 flex-1 border border-neutral-600 bg-neutral-900/60 items-center justify-center rounded px-3 text-sm leading-none outline-none selection:bg-teal-600"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="board"
            autoFocus
            spellCheck="false"
            value={name}
            maxLength={MAX_LENGTH_NAME}
          />
          <Dialog.Button
            className="mt-3 self-end w-fit"
            onClick={() => handleCreate()}
          >
            Create
          </Dialog.Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
type IconToggle = {
  key: string;
  icon: React.ReactNode;
  toogled?: boolean;
  used?: boolean;
};

type IconToggleProps = {
  id: string;
  icon: React.ReactNode;
  used?: boolean;
  active?: boolean;
  onChange: (id: string) => void;
};

const INITIAL_TOGGLE_ICON_STATE: IconToggle[] = [
  { key: "code", icon: <CodeIcon /> },
  { key: "book", icon: <BookIcon /> },
  { key: "game", icon: <GameIcon /> },
  { key: "heart", icon: <HeartIcon /> },
  { key: "star", icon: <StarIcon /> },
  { key: "hammer", icon: <HammerIcon /> },
  { key: "calendar", icon: <CalendarIcon /> },
  { key: "db", icon: <DataBaseIcon /> },
  { key: "folder", icon: <FolderIcon /> },
  { key: "pin", icon: <PinIcon /> },
  { key: "trophy", icon: <TrophyIcon /> },
  { key: "box", icon: <BoxIcon /> },
];

function IconButton({ icon, id, used, active, onChange }: IconToggleProps) {
  function handeleChange() {
    onChange(id);
  }

  return (
    <button
      disabled={used}
      className={`flex disabled:text-neutral-600 disabled:hover:bg-neutral-700/50 hover:bg-neutral-700 text-[22px] text-neutral-300 items-center p-3 justify-center bg-neutral-700/50 rounded-lg 
    ${active && "bg-teal-700 hover:bg-teal-600 text-neutral-100 font-medium"}`}
      onClick={() => handeleChange()}
    >
      {icon}
    </button>
  );
}

function getIconState(sidebarState: SideBarItemLink[]): IconToggle[] {
  const prevIconState = [...INITIAL_TOGGLE_ICON_STATE];
  const usedIcons = [...sidebarState.map((i) => i.icon)];

  return prevIconState.map((i) => {
    if (usedIcons.includes(i.key)) {
      return { ...i, used: true };
    } else {
      return i;
    }
  });
}

type IconsGroupProps = {
  onSelection: React.Dispatch<React.SetStateAction<IconToggle | null>>;
};

function IconsGroup({ onSelection }: IconsGroupProps) {
  const sidebarState = useContext(SidebarContext);
  const [state, setState] = useState(getIconState(sidebarState));

  function handleChange(key: string) {
    const iconButton = state.filter((t) => t.key === key)[0];
    onSelection(iconButton);

    setState((prevState) => {
      return prevState.map((t) => {
        if (t.key === key) {
          return { ...t, toogled: !t.toogled };
        } else {
          return { ...t, toogled: false };
        }
      });
    });
  }
  return (
    <>
      {state.map((i) => {
        return (
          <IconButton
            onChange={handleChange}
            key={i.key}
            id={i.key}
            active={i.toogled}
            used={i.used}
            icon={i.icon}
          />
        );
      })}
    </>
  );
}
