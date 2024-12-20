export type ColumProps = {
  title: string;
  headingColor: string;
  name: string;
  cards: CardsProps[];
};

export type CardsProps = {
  title: string;
  columnName: string;
  id: string;
  date: string;
  tags: Tags;
};

export type SelectTags = {
  color: "red" | "yellow" | "green" | "blue";
  value: boolean;
};

export type Tags = {
  red: boolean;
  yellow: boolean;
  green: boolean;
  blue: boolean;
};

export type TagSelectorProps = {
  state: Tags;
  setTags: (value: React.SetStateAction<Tags>) => void;
};

export type DropIndicatorProps = {
  prevId?: string;
  currColumn: string;
};

export type AddCardsProps = {
  columnName: string;
};

type AddCardAction = {
  type: "add";
  newCard: CardsProps;
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
