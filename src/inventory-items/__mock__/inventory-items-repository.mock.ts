import AutoIncrementId from '../../shared/helpers/AutoIncrementId';
import { InventoryItem } from '../../shared/interfaces/mockfn.interface';
import { CreateInventoryItemDto } from '../dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from '../dto/update-inventory-item.dto';
import type { InventoryItemEntity } from '../entities/inventory-item.entity';

let inventoryItems: InventoryItem[] = [];

export const MockInventoryItemRepository = {
  save: jest.fn().mockImplementation((inventoryItem: InventoryItemEntity) => {
    const item = {
      id: AutoIncrementId(inventoryItems),
      ...inventoryItem,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inventoryItems.push(item);
    return Promise.resolve(item);
  }),
  findById: jest.fn().mockImplementation((id: number) => {
    const item = inventoryItems.find((item) => item.id === id);
    return Promise.resolve(item);
  }),
  find: jest.fn().mockReturnValue(Promise.resolve(inventoryItems)),
  delete: jest.fn().mockImplementation((id: number) => {
    inventoryItems = inventoryItems.filter((item) => item.id !== id);
  }),
  exists: jest.fn().mockImplementation((id: number) => {
    const item = inventoryItems.find((item) => item.id === id);
    return Promise.resolve(item ? true : false);
  }),
  findByIdAndDelete: jest.fn().mockImplementation((id: number) => {
    const item = inventoryItems.find((item) => item.id === id);
    inventoryItems = inventoryItems.filter((item) => item.id !== id);
    return Promise.resolve(item);
  }),
  create: jest
    .fn()
    .mockImplementation((createInventoryItemDto: CreateInventoryItemDto) => {
      return { ...createInventoryItemDto };
    }),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation(
      (id: number, updateInventoryItemDto: UpdateInventoryItemDto) => {
        const item = inventoryItems.find((item) => item.id === id);
        for (const prop in updateInventoryItemDto) {
          item[prop] = updateInventoryItemDto[prop];
        }
        item.updatedAt = new Date();

        return item;
      },
    ),
};
