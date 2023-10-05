export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[];
};

export type OrdersAndIds = {
  id: number;
  userId: number;
  productIds?: number[];
};