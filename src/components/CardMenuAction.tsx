import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardDispatchContext, DEFAULT_BOARD } from "../Context";
import { CardProps } from "../types";
import { IS_DEV } from "../utils";
import { CardDialog } from "./CardDialog";
import { AlertIcon, ChevronIcon, EditIcon, TrashIcon } from "./Icons";
import { Action, CheckAction } from "./MenuAction";
import DropdownMenu from "./UI/DropdownMenu";

type MenuActionProps = PropsWithChildren & {
  card: CardProps;
  onDelete: () => void;
};

export function MenuAction({
  children,
  card,
  onDelete: onDelete,
}: MenuActionProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <CardOptions
            card={card}
            onEdit={() => setOpenDialog(true)}
            onDelete={onDelete}
          />
        </DropdownMenu.Content>
      </DropdownMenu>

      <CardDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        columnId={card.columnId}
        card={card}
      ></CardDialog>
    </>
  );
}

type CardOptionsProps = {
  card: CardProps;
  onEdit: () => void;
  onDelete: () => void;
};

function CardOptions({ card, onEdit, onDelete }: CardOptionsProps) {
  const dispatch = useContext(CardDispatchContext);
  const [red, setRed] = useState(card.tags.red);
  const [yellow, setYellow] = useState(card.tags.yellow);
  const [green, setGreen] = useState(card.tags.green);
  const [blue, setBlue] = useState(card.tags.blue);
  const { id } = useParams();

  function handleChangeTags(tag: string, value: boolean) {
    dispatch({
      type: "updateTags",
      id: card.id,
      tags: { ...card.tags, [tag]: value },
      board: id ?? DEFAULT_BOARD,
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
        onClick={() => onEdit()}
        icon={<EditIcon />}
        label="Edit"
        variant="default"
      />

      <Action
        onClick={() => onDelete()}
        icon={<TrashIcon />}
        label="Delete"
        variant="danger"
      />

      <SubMenuAction lable="Tags">
        <CheckAction checked={red} onCheckedChange={setRed} label="Red" />
        <CheckAction
          checked={yellow}
          onCheckedChange={setYellow}
          label="Yellow"
        />
        <CheckAction checked={green} onCheckedChange={setGreen} label="Green" />
        <CheckAction checked={blue} onCheckedChange={setBlue} label="Blue" />
      </SubMenuAction>
      {IS_DEV && (
        <>
          <DropdownMenu.Separator />

          <Action
            variant="default"
            className="ml-3 text-xs text-neutral-500"
            icon={<AlertIcon />}
            label={`ID: ${card.id}`}
            disabled
          />
        </>
      )}
    </>
  );
}

type SubMenuActionProps = PropsWithChildren<{
  lable: string;
}>;

function SubMenuAction({ children, lable }: SubMenuActionProps) {
  return (
    <DropdownMenu.SubMenu>
      <DropdownMenu.SubTrigger>
        <span className="flex w-full items-center justify-between cursor-default">
          {lable}
          <ChevronIcon />
        </span>
      </DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>{children}</DropdownMenu.SubContent>
    </DropdownMenu.SubMenu>
  );
}
