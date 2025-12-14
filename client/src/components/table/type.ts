export type TProps<T> = {
  columns: TColumn[];
  data: T[];
  maxHeight?: number | string;
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
  width?: number;
  align?: TAlign;
  sticky?: "left" | "right";
  cell?: (value: string, index: number, row: unknown) => React.ReactElement;
};

export type TAlign = "left" | "right" | "inherit" | "center" | "justify"