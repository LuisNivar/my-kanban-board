export type ColumnProps = ColumnType & {
  cards: ItemProps[];
};

export type ColumnType = {
  id: string;
  name: string;
  color: headingColor;
};

export type headingColor =
  | "amber"
  | "cyan"
  | "red"
  | "neutral"
  | "emerald"
  | "purple";

export type ItemProps = {
  title: string;
  description: string;
  columnId: ColumnType["id"];
  id: string;
  date: Date;
  tags: Tag;
};

type BoardProps = {
  [id: string]: ItemProps[];
};

export type CardProps = ItemProps;

export type SelectTags = {
  color: "red" | "yellow" | "green" | "blue";
  value: boolean;
};

export type Tag = {
  red: boolean;
  yellow: boolean;
  green: boolean;
  blue: boolean;
};

export type TagSelectorProps = {
  state: Tag;
  setTags: (value: React.SetStateAction<Tag>) => void;
};

export type DropIndicatorProps = {
  beforeId?: string | null;
  currColumn: ColumnProps["id"];
};

export type AddCardProps = {
  columnId: ColumnProps["id"];
  board: string;
};

type AddCardAction = {
  type: "add";
  newCard: ItemProps;
  board: string;
};

type DeleteCardAction = {
  type: "delete";
  id: ItemProps["id"];
  board: string;
};

type MoveCardAction = {
  type: "move";
  id: ItemProps["id"];
  column: ColumnProps["id"];
  board: string;
};

type UpdateTags = {
  type: "updateTags";
  id: ItemProps["id"];
  tags: Tag;
  board: string;
};

type UpdateItemBoard = {
  type: "updateItemsBoard";
  cards: ItemProps[];
  board: string;
};

type UpdateText = {
  type: "updateText";
  id: ItemProps["id"];
  description: ItemProps["description"];
  board: string;
};

type UpdateBoards = {
  type: "updateBoards";
  boards: BoardProps;
};

type Update = {
  type: "update";
  id: string;
  value: Omit<ItemProps, "id">;
  board: string;
};

type SideBarItemLink = {
  path: string;
  name: string;
  icon: string;
  id: string;
  background?: string = "bg-neutral-900";
  columns: ColumnType[];
};

type AddBoardAction = {
  type: "add";
  newItemLink: SideBarItemLink;
};

type RenameBoardAction = {
  type: "rename";
  id: string;
  newName: string;
};

type DeleteBoardAction = {
  type: "delete";
  id: string;
};

type UpdateAll = {
  type: "updateAll";
  state: SideBarItemLink[];
};

export type IconToggle = {
  key: string;
  icon: React.ReactNode;
  toogled?: boolean;
  used?: boolean;
};

export type IconToggleProps = {
  id: string;
  icon: React.ReactNode;
  used?: boolean;
  active?: boolean;
  onChange: (id: string) => void;
};

export type BackgroundToggleProps = {
  id: string;
  background: string;
  disable?: boolean;
  active?: boolean;
  onChange: (id: string) => void;
};

export type BackgroundChange = {
  type: "backgroundChange";
  boardId: string;
  background: string;
};

export type AddColumnAction = {
  type: "addColumn";
  boardId: string;
  newColumn: ColumnType;
};

export type RemoveColumnAction = {
  type: "deleteColumn";
  boardId: string;
  columnId: string;
};

export type UpdateColumnAction = {
  type: "updateColumn";
  boardId: string;
  columnId: string;
  values: Omit<ColumnType, "id">;
};
export type ActionsCardsType =
  | AddCardAction
  | DeleteCardAction
  | MoveCardAction
  | UpdateTags
  | UpdateText
  | UpdateItemBoard
  | Update
  | AddBoard
  | UpdateBoards;

export type ActionsSidebarType =
  | AddColumnAction
  | RemoveColumnAction
  | AddBoardAction
  | UpdateAll
  | RenameBoardAction
  | DeleteBoardAction
  | BackgroundChange
  | UpdateColumnAction;
