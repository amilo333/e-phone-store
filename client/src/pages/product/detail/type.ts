export type TProductModel = {
  name: string;
  list: {
    value: string;
    isActive?: boolean;
  }[];
};
