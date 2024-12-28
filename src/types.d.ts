export type ColumProps = {
  title: string;
  headingColor: string;
  name: string;
  cards: ItemProps[];
};

export type ItemProps = {
  title: string;
  columnName: string;
  id: string;
  date: string;
  tags: Tag;
};

export type CardProps = ItemProps & {
  editable: boolean | false;
  order: number;
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
  prevId?: string;
  currColumn: string;
};

export type AddCardProps = {
  columnName: string;
};

type AddCardAction = {
  type: "add";
  newCard: ItemProps;
};

type DeleteCardAction = {
  type: "delete";
  id: string;
};

type MoveCardAction = {
  type: "move";
  id: string;
  column: string;
};

type UpdateTags = {
  type: "updateTags";
  id: string;
  tags: Tag;
};

type UpdateText = {
  type: "updateText";
  id: string;
  title: string;
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
  | UpdateText;
