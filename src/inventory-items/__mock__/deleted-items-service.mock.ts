import AutoIncrementId from '../../shared/helpers/AutoIncrementId';
import type { DeletedItemDto } from '../../deleted-items/dto/deleted-item.dto';
import { DeletedItem } from '../../shared/interfaces/mockfn.interface';

let deletedItems: DeletedItem[] = [];

export const MockDeletedItemsService = {
  create: jest.fn().mockImplementation((deletedItemDto: DeletedItemDto) => {
    const item: DeletedItem = {
      id: AutoIncrementId(deletedItems),
      ...deletedItemDto,
      updatedAt: new Date(),
    };

    deletedItems.push(item);
    return Promise.resolve(item);
  }),
  isItemInBin: jest.fn().mockImplementation((itemId: number) => {
    return Promise.resolve(deletedItems.some((item) => item.itemId === itemId));
  }),
  getDeletedItems: jest.fn().mockReturnValue(Promise.resolve(deletedItems)),
  restoreItem: jest.fn().mockImplementation(<T>(itemId: number) => {
    const deletedItem = deletedItems.find((item) => item.itemId === itemId);
    if (deletedItem) {
      const restoredItem = {
        productCategory: deletedItem.productCategory,
        title: deletedItem.title,
        brand: deletedItem.brand,
        price: deletedItem.price,
        currency: deletedItem.currency,
        quantity: deletedItem.quantity,
        createdAt: deletedItem.createdAt,
      } as unknown as T;

      deletedItems = deletedItems.filter(
        (item) => item.itemId !== deletedItem.id,
      );

      return Promise.resolve(restoredItem);
    }
  }),
};
