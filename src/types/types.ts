export type DiamondType = {
  id: number;
  color: string;
  img: string;
  hidden?: boolean;
  disabled?: boolean;
};

export type DataGameType = {
  data: DiamondType[];
};
