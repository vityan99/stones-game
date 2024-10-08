export type DataType = {
  id: number;
  color: string;
  img: string;
};

export type DataGameType = {
  data: DataType[];
};

export type ClickedType = {
  id: number;
  clicked: boolean;
  found?: boolean;
  color: string;
};
