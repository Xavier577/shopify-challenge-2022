interface DeletedItem {
  id: number;

  itemId: number;

  productCategory: string;

  title: string;

  brand: string;

  price: number;

  currency: string;

  quantity: number;

  createdAt: Date;

  updatedAt: Date;
}

const mockItems: DeletedItem[] = [];

export const mockDeletedItemRepository = {
  save: jest.fn().mockImplementation((item: DeletedItem) => {
    let itemExist = mockItems.find((mockItem) => mockItem.id === item.id);
    if (itemExist) {
      const id = itemExist.id;
      const itemId = itemExist.itemId;
      itemExist = { ...itemExist, ...item, id, itemId };
      return Promise.resolve(itemExist);
    } else {
      const newMockItem: DeletedItem = {
        ...item,
        id: mockItems.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockItems.push(newMockItem);
      return Promise.resolve(newMockItem);
    }
  }),
};
