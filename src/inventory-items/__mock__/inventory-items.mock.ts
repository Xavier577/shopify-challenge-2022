interface MockItem {
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

const mockItems: MockItem[] = [];

export const mockInventoryItemRepository = {
  // findOne: jest.fn().mockImplementation((id) => {
  //   const item = mockItems.find((item) => item.id === id);
  //   return Promise.resolve(item)
  // }),
  save: jest.fn().mockImplementation((item: MockItem) => {
    let itemExist = mockItems.find((mockItem) => mockItem.id === item.id);
    if (itemExist) {
      const id = itemExist.id;
      itemExist = { ...itemExist, ...item, id };
      return Promise.resolve(itemExist);
    } else {
      const newMockItem: MockItem = {
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
