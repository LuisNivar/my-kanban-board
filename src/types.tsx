export type ColumProps = {
  title: string;
  headingColor: string;
  name: string;
  cards: CardProps[];
};

export type CardProps = {
  title: string;
  columnName: string;
  id: string;
  date: string;
  tags: Tag;
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
  newCard: CardProps;
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

export type ActionsType = AddCardAction | DeleteCardAction | MoveCardAction;
