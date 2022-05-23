import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeletedItemsService } from '../deleted-items/deleted-items.service';
import { InventoryItemsRepository } from './inventory-items.repository';
import { InventoryItemsService } from './inventory-items.service';
import { MockDeletedItemsService } from './__mock__/deleted-items-service.mock';
import { MockInventoryItemRepository } from './__mock__/inventory-items-repository.mock';

describe('unit test for InventoryItemsService', () => {
  let service: InventoryItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryItemsService,
        {
          provide: getRepositoryToken(InventoryItemsRepository),
          useValue: MockInventoryItemRepository,
        },
        { provide: DeletedItemsService, useValue: MockDeletedItemsService },
      ],
    }).compile();

    service = module.get<InventoryItemsService>(InventoryItemsService);
  });

  it('InventoryItemsService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('InventoryItemsService.create should create inventory item', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'freepod3',
      brand: 'oraimo',
      quantity: 1,
      price: 15000,
      currency: 'NGN',
    });

    expect(item).toMatchObject({
      id: expect.any(Number),
      productCategory: 'electronics',
      title: 'freepod3',
      brand: 'oraimo',
      quantity: 1,
      price: 15000,
      currency: 'NGN',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('InventoryItemsService.findAll should return the list of all items with the correct fields', async () => {
    await service.create({
      productCategory: 'fashion',
      title: 'airforce 3',
      brand: 'Nike',
      quantity: 5,
      price: 45000,
      currency: 'NGN',
    });
    await service.create({
      productCategory: 'skincare',
      title: 'whitelace',
      brand: 'skin helpers',
      quantity: 1,
      price: 5000,
      currency: 'NGN',
    });
    const items = await service.findAll();
    expect(Array.isArray(items)).toBeTruthy();
    for (const item of items) {
      expect(item).toMatchObject({
        id: expect.any(Number),
        productCategory: expect.any(String),
        title: expect.any(String),
        brand: expect.any(String),
        quantity: expect.any(Number),
        price: expect.any(Number),
        currency: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    }
  });

  it("InventoryItemsService.findById should return an item provided it's id", async () => {
    const { id } = await service.create({
      productCategory: 'fashion',
      title: 'airforce 3',
      brand: 'Nike',
      quantity: 5,
      price: 45000,
      currency: 'NGN',
    });
    const item = await service.findById(id);
    expect(item).toBeTruthy();
  });

  it('InventoryItemsService.findById should return null when an item id does not exist', async () => {
    const item = await service.findById(300);
    expect(item).toBeFalsy();
  });

  it('InventoryItemsService.exists should return true if an item exists or as not been deleted', async () => {
    const doesItemExist = await service.exists(1);
    expect(doesItemExist).toBeTruthy();
  });

  it('InventoryItemsService.exists should return false if an item does not exist or has been deleted', async () => {
    const doesItemExist = await service.exists(40);
    expect(doesItemExist).toBeFalsy();
  });

  it('InventoryItemsService.update should update item fields', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'airpod 3',
      brand: 'apple',
      quantity: 1,
      price: 15000,
      currency: 'NGN',
    });

    const updatedItem = await service.update(item.id, { price: 120000 });

    expect(item.price).toEqual(updatedItem.price);
  });

  it('InventoryItemsService.remove should remove an item from the list', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'Macbook pro M1 max',
      brand: 'apple',
      quantity: 1,
      price: 1500000,
      currency: 'NGN',
    });
    await service.remove(item.id, { deletionComment: 'we are sold out' });
    const isItemInList = await service.exists(item.id);
    expect(isItemInList).toBeFalsy();
  });

  it('InventoryItemsService.fetchDeletedItems should return list of deleted Items', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'Macbook pro M1 pro',
      brand: 'apple',
      quantity: 1,
      price: 1100000,
      currency: 'NGN',
    });
    await service.remove(item.id, { deletionComment: 'we are sold out' });
    const deletedItems = await service.fetchDeletedItems();
    expect(Array.isArray(deletedItems)).toBeTruthy();
    for (const item of deletedItems) {
      expect(item).toMatchObject({
        id: expect.any(Number),
        itemId: expect.any(Number),
        deletionComment: expect.any(String),
        productCategory: expect.any(String),
        title: expect.any(String),
        brand: expect.any(String),
        quantity: expect.any(Number),
        price: expect.any(Number),
        currency: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    }
  });

  it('InventoryItemsService.isItemDeletedItem should return true for item that is deletedItem list', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'Macbook pro M1 pro',
      brand: 'apple',
      quantity: 1,
      price: 1100000,
      currency: 'NGN',
    });
    await service.remove(item.id, { deletionComment: 'we are sold out' });
    const isItemInBin = await service.isItemADeletedItem(item.id);
    expect(isItemInBin).toBeTruthy();
  });

  it('InventoryItemsService.restoreDeletedItem should restore a previously deleted item if it is the deletedItem list', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'Macbook pro M1 pro',
      brand: 'apple',
      quantity: 1,
      price: 1100000,
      currency: 'NGN',
    });
    await service.remove(item.id, { deletionComment: 'we are sold out' });
    const restoredItem = await service.restoreDeletedItem(item.id);
    expect(restoredItem).toMatchObject({
      id: expect.any(Number),
      productCategory: expect.any(String),
      title: expect.any(String),
      brand: expect.any(String),
      quantity: expect.any(Number),
      price: expect.any(Number),
      currency: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('InventoryItemsService.restoreDeletedItem should return null if item is not in deletedItem list', async () => {
    const restoredItem = await service.restoreDeletedItem(20);
    expect(restoredItem).toBeUndefined();
  });
});
