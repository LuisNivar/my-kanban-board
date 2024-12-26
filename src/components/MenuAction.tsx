import { PropsWithChildren, useContext, useEffect, useState } from "react";
import DropdownMenu, {
  CheckboxItemProps,
  OptionProps,
} from "./UI/DropdownMenu";
import { GoTrash as TrashIcon } from "react-icons/go";
import { GrEdit as EditIcon } from "react-icons/gr";
import { GoAlert as AlertIcon } from "react-icons/go";
import { CardProps } from "../types";
import { CardDispatchContext } from "../Context";
import { IS_DEV } from "../utils";
import { GoChevronRight as ChevronIcon } from "react-icons/go";

type MenuActionProps = PropsWithChildren & {
  card: CardProps;
  handleRename: () => void;
};

export function MenuAction({ children, card, handleRename }: MenuActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <CardOptions card={card} handleRename={handleRename} />
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

type ActionProps = OptionProps & {
  label: string;
  icon?: React.ReactNode;
};

function Action({ label, icon, variant, ...props }: ActionProps) {
  return (
    <DropdownMenu.Item variant={variant} {...props}>
      <button
        className={`flex items-center gap-2 w-full ${!icon ? "ml-6" : ""}`}
      >
        {icon} <span>{label}</span>
      </button>
    </DropdownMenu.Item>
  );
}

function CheckAction({ label, ...props }: CheckboxItemProps) {
  return <DropdownMenu.CheckboxItem label={label} {...props} />;
}

type CardOptionsProps = {
  card: CardProps;
  handleRename: () => void;
};

function CardOptions({ card, handleRename }: CardOptionsProps) {
  const dispatch = useContext(CardDispatchContext);
  const [red, setRed] = useState(card.tags.red);
  const [yellow, setYellow] = useState(card.tags.yellow);
  const [green, setGreen] = useState(card.tags.green);
  const [blue, setBlue] = useState(card.tags.blue);

  const handleDelete = () => {
    dispatch({ type: "delete", id: card.id });
  };

  const handleEdit = () => {
    handleRename();
  };

  function handleChangeTags(tag: string, value: boolean) {
    dispatch({
      type: "updateTags",
      id: card.id,
      tags: { ...card.tags, [tag]: value },
    });
  }

  //TODO: Refactor MB
  useEffect(() => {
    handleChangeTags("red", red);
  }, [red]);

  useEffect(() => {
    handleChangeTags("yellow", yellow);
  }, [yellow]);

  useEffect(() => {
    handleChangeTags("green", green);
  }, [green]);

  useEffect(() => {
    handleChangeTags("blue", blue);
  }, [blue]);

  return (
    <>
      <Action
        onClick={() => handleEdit()}
        icon={<EditIcon />}
        label="Edit"
        variant="default"
      />

      <Action
        onClick={() => handleDelete()}
        icon={<TrashIcon />}
        label="Delete"
        variant="danger"
      />

      {/* 
      TODO: Refactor */}
      <DropdownMenu.SubMenu>
        <DropdownMenu.SubTrigger>
          <span className="flex w-full items-center justify-between cursor-default">
            Tags
            <ChevronIcon />
          </span>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <CheckAction checked={red} onCheckedChange={setRed} label="Red" />
          <CheckAction
            checked={yellow}
            onCheckedChange={setYellow}
            label="Yellow"
          />
          <CheckAction
            checked={green}
            onCheckedChange={setGreen}
            label="Green"
          />
          <CheckAction checked={blue} onCheckedChange={setBlue} label="Blue" />
        </DropdownMenu.SubContent>
      </DropdownMenu.SubMenu>

      {IS_DEV && (
        <>
          <DropdownMenu.Separator />

          <Action
            variant="default"
            icon={<AlertIcon />}
            label={`ID: ${card.id}`}
            disabled
          />
        </>
      )}
    </>
  );
}
