import {
  InventoryItem,
  DeletedItem,
} from 'src/shared/interfaces/mockfn.interface';
import type { CreateInventoryItemDto } from '../dto/create-inventory-item.dto';
import type { DeletionCommentDto } from '../dto/deletion-comment.dto';
import type { UpdateInventoryItemDto } from '../dto/update-inventory-item.dto';

let inventoryItems: InventoryItem[] = [];
let deletedItems: DeletedItem[] = [];

const AutoIncrementId = (arr: any[]) => arr.length + 1;

export const MockInventoryItemService = {
  create: jest
    .fn()
    .mockImplementation((createInventoryItemDto: CreateInventoryItemDto) => {
      const item: InventoryItem = {
        id: AutoIncrementId(inventoryItems),
        ...createInventoryItemDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inventoryItems.push(item);
      return Promise.resolve(item);
    }),
  findAll: jest.fn().mockImplementation(() => Promise.resolve(inventoryItems)),
  findById: jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(inventoryItems.find((item) => item.id === id));
  }),
  exists: jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(inventoryItems.some((item) => item.id === id));
  }),
  update: jest
    .fn()
    .mockImplementation(
      (id: number, updateInventoryItemDto: UpdateInventoryItemDto) => {
        const item = inventoryItems.find((item) => item.id === id);
        for (const prop in updateInventoryItemDto) {
          item[prop] = updateInventoryItemDto[prop];
        }
        item.updatedAt = new Date();
        return Promise.resolve(item);
      },
    ),
  remove: jest
    .fn()
    .mockImplementation(
      (id: number, deletionCommentDto: DeletionCommentDto) => {
        const { id: itemId, ...rest } = inventoryItems.find(
          (item) => item.id === id,
        );
        deletedItems.push({
          id: AutoIncrementId(deletedItems),
          ...deletionCommentDto,
          itemId: itemId,
          ...rest,
        });
        inventoryItems = inventoryItems.filter((item) => item.id !== id);
        return Promise.resolve({ success: true });
      },
    ),
  fetchDeletedItems: jest
    .fn()
    .mockImplementation(() => Promise.resolve(deletedItems)),
  isItemADeletedItem: jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(deletedItems.some((item) => item.id === id));
  }),
  restoreDeletedItem: jest.fn().mockImplementation((id: number) => {
    const { itemId, ...rest } = deletedItems.find((item) => item.id === id);
    const restoredItem: InventoryItem = { id: itemId, ...rest };
    inventoryItems.push(restoredItem);
    deletedItems = deletedItems.filter((item) => item.id !== id);
    return Promise.resolve(restoredItem);
  }),
};
