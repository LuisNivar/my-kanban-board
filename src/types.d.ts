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
  date: string;
  tags: Tag;
};

type BoardProps = {
  [id: string]: ItemProps[];
};

export type CardProps = ItemProps & {
  editable: boolean | false;
};

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

type AddBoard = {
  type: "addBoard";
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

export type ActionsType =
  | AddCardAction
  | DeleteCardAction
  | MoveCardAction
  | UpdateTags
  | UpdateText
  | UpdateItemBoard
  | Update
  | AddBoard
  | UpdateBoards;
