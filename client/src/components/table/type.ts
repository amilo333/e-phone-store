export type TProps<T> = {
  columns: TColumn[];
  data: T[];
  maxHeight?: number;
  infinityScroll?: boolean;
};

export type TCommonTableData = {
  code: string;
  row: TColumn["id"];
};

export type TColumn = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  sticky?: "left" | "right";
  format?: (value: number) => string;
};
