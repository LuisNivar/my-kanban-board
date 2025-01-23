import { useContext, useState } from "react";
import { ColumnType, ColumnProps, ItemProps } from "../../types";
import { Card } from "../Card";
import ColumnHeader from "./ColumnHeader";
import DraggableZone from "./DraggableZone";
import { NewTaskButton } from "./NewTaskButton";
import DeleteDialog from "../DeleteDialog";
import { useParams } from "react-router-dom";
import { SidebarDispatchContext } from "../../Context";
import ColumnDialog from "../ColumnDialog";

export default function Column(props: ColumnProps) {
  const { id: columnId, color, cards, name } = props;
  const filteredCards = cards.filter((c: ItemProps) => c.columnId === columnId);
  const { id } = useParams();

  const dispatch = useContext(SidebarDispatchContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  function handlerDelete() {
    if (!id) return;
    dispatch({ type: "deleteColumn", boardId: id, columnId: columnId });
  }

  function handlerEdit() {
    //TODO: Real Edit
    setOpenEditDialog(true);
  }

  const currentColumn: ColumnType = { color, id: columnId, name };

  return (
    <>
      <div className="flex flex-col gap-2 shrink-0 grow-0 w-56 h-full">
        <ColumnHeader
          color={color}
          title={name}
          count={filteredCards.length}
          onDelete={() => setOpenDeleteDialog(true)}
          onEdit={handlerEdit}
        />
        <DraggableZone cards={cards} id={columnId}>
          {filteredCards.map((card: ItemProps) => (
            <Card key={card.id} {...card} />
          ))}
        </DraggableZone>
        <NewTaskButton id={columnId} />
      </div>

      <DeleteDialog
        onConfirm={() => handlerDelete()}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />

      <ColumnDialog
        column={currentColumn}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      />
    </>
  );
}
