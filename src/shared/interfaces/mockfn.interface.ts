export interface InventoryItem {
  id: number;

  productCategory: string;

  title: string;

  brand: string;

  price: number;

  currency: string;

  quantity: number;

  createdAt: Date;

  updatedAt: Date;
}

export interface DeletedItem extends InventoryItem {
  itemId: number;
}
