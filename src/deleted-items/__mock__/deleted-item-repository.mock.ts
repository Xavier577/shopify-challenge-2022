import AutoIncrementId from '../../shared/helpers/AutoIncrementId';
import { DeletedItem } from '../../shared/interfaces/mockfn.interface';
import { DeletedItemDto } from '../dto/deleted-item.dto';
import type { DeletedItemEntity } from '../entity/deleted-item.entity';

let deletedItems: DeletedItem[] = [];

export const MockDeletedItemRepository = {
  save: jest.fn().mockImplementation((deletedItem: DeletedItemEntity) => {
    const item = {
      id: AutoIncrementId(deletedItems),
      ...deletedItem,
      updatedAt: new Date(),
    };
    deletedItems.push(item);
    return Promise.resolve(item);
  }),
  findByItemId: jest.fn().mockImplementation((itemId: number) => {
    const item = deletedItems.find((item) => item.id === itemId);
    return Promise.resolve(item);
  }),
  find: jest.fn().mockReturnValue(Promise.resolve(deletedItems)),
  delete: jest.fn().mockImplementation((id: number) => {
    deletedItems = deletedItems.filter((item) => item.itemId !== id);
  }),
  itemIdExists: jest.fn().mockImplementation((itemId: number) => {
    const item = deletedItems.find((item) => item.itemId === itemId);
    return Promise.resolve(item ? true : false);
  }),
  findByItemIdAndDelete: jest.fn().mockImplementation((itemId: number) => {
    const item = deletedItems.find((item) => item.itemId === itemId);
    deletedItems = deletedItems.filter((item) => item.itemId !== itemId);
    return Promise.resolve(item);
  }),
  create: jest
    .fn()
    .mockImplementation((createDeletedItemDto: DeletedItemDto) => {
      return { ...createDeletedItemDto };
    }),
};
