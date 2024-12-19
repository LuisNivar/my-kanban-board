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

export type ActionsType = AddCardAction | DeleteCardAction;
