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
