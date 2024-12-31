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
};

type AddCardAction = {
  type: "add";
  newCard: ItemProps;
};

type DeleteCardAction = {
  type: "delete";
  id: ItemProps["id"];
};

type MoveCardAction = {
  type: "move";
  id: ItemProps["id"];
  column: ColumProps["name"];
};

type UpdateTags = {
  type: "updateTags";
  id: ItemProps["id"];
  tags: Tag;
};

type UpdateAll = {
  type: "updateAll";
  cards: ItemProps[];
};

type UpdateText = {
  type: "updateText";
  id: ItemProps["id"];
  description: ItemProps["description"];
};

// type Update = {
//   type: "update"
//   id: string;
//   props : Omit<CardProps, "id">
// }

export type ActionsType =
  | AddCardAction
  | DeleteCardAction
  | MoveCardAction
  | UpdateTags
  | UpdateText
  | UpdateAll;
