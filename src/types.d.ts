export type ColumProps = {
  title: string;
  headingColor: string;
  name: string;
  cards: ItemProps[];
};

export type ItemProps = {
  title: string;
  description: string;
  columnName: ColumProps["name"];
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
  currColumn: ColumProps["name"];
};

export type AddCardProps = {
  columnName: ColumProps["name"];
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
  column: ColumProps["name"];
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
  name: string;
  icon: string;
  path: string;
  background?: string = "bg-neutral-900";
};

type AddBoardAction = {
  type: "add";
  itemLink: SideBarItemLink;
};

type RenameBoardAction = {
  type: "rename";
  icon: string;
  newName: string;
};

type DeleteBoardAction = {
  type: "delete";
  icon: string;
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
  icon: string;
  background: string;
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
  | AddBoardAction
  | UpdateAll
  | RenameBoardAction
  | DeleteBoardAction
  | BackgroundChange;
