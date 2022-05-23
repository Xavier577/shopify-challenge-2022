import { Test, TestingModule } from '@nestjs/testing';
import PromiseWrapper from '../shared/helpers/promise-wrapper';
import { InventoryItemsController } from './inventory-items.controller';
import { InventoryItemsService } from './inventory-items.service';
import { MockInventoryItemService } from './__mock__/inventory-items-service.mock';

describe('Unit test for InventoryItemsController', () => {
  let controller: InventoryItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryItemsController],
      providers: [
        {
          provide: InventoryItemsService,
          useValue: MockInventoryItemService,
        },
      ],
    }).compile();

    controller = module.get<InventoryItemsController>(InventoryItemsController);
  });

  it('InventoryItemsController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('InventoryItemsController.create should create an item when passed in valid fields', async () => {
    const [newItem] = await PromiseWrapper(
      controller.create({
        productCategory: 'electronics',
        title: 'freepod3',
        brand: 'oraimo',
        quantity: 1,
        price: 15000,
        currency: 'NGN',
      }),
    );

    expect(newItem).toBeDefined();
    expect(newItem).toMatchObject({
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

  it('InventoryItemsController.findAll should return the list of all inventory items', async () => {
    await controller.create({
      productCategory: 'fashion',
      title: 'airforce 3',
      brand: 'Nike',
      quantity: 5,
      price: 45000,
      currency: 'NGN',
    });
    await controller.create({
      productCategory: 'skincare',
      title: 'whitelace',
      brand: 'skin helpers',
      quantity: 1,
      price: 5000,
      currency: 'NGN',
    });
    const inventoryItems = await controller.findAll();
    expect(Array.isArray(inventoryItems)).toBeTruthy();
    for (const inventoryItem of inventoryItems) {
      expect(inventoryItem).toMatchObject({
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

  it('InventoryItemsController.findById should return an item if it exists', async () => {
    const [{ id }] = await PromiseWrapper(
      controller.create({
        productCategory: 'skincare',
        title: 'whitelace',
        brand: 'skin helpers',
        quantity: 1,
        price: 5000,
        currency: 'NGN',
      }),
    );

    const [item] = await PromiseWrapper(controller.findById(id));
    expect(item).toBeDefined();
  });

  it('InventoryItemsController.findById should throw an error when item does exist', async () => {
    const [_, err] = await PromiseWrapper(controller.findById(500));
    expect(err).toBeDefined();
  });

  it('InventoryItemsController.update should update item if it exist and is given valid fields', async () => {
    const [item] = await PromiseWrapper(
      controller.create({
        productCategory: 'electronics',
        title: 'airpod 3',
        brand: 'apple',
        quantity: 1,
        price: 15000,
        currency: 'NGN',
      }),
    );

    const updatedItem = await controller.update(item.id, { price: 120000 });

    expect(item.price).toEqual(updatedItem.price);
  });

  it('InventoryItemsController.update should throw an error if item  does not exist', async () => {
    const [_, err] = await PromiseWrapper(
      controller.update(900, { price: 120000 }),
    );

    expect(err).toBeDefined();
  });

  it('InventoryItemsController.remove should throw an error if it item does not exist', async () => {
    const [_, err] = await PromiseWrapper(
      controller.remove(404, { deletionComment: 'we are sold out' }),
    );
    expect(err).toBeDefined();
  });

  it('InventoryItemsController.getDeletedItems should return all deleted items', async () => {
    const [item] = await PromiseWrapper(controller.getDeletedItems());
    expect(Array.isArray(item)).toBeTruthy();
  });
});
