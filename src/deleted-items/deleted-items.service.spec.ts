import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InventoryItem } from '../shared/interfaces/mockfn.interface';
import { DeletedItemsRepository } from './deleted-items.repository';
import { DeletedItemsService } from './deleted-items.service';
import { DeletedItemDto } from './dto/deleted-item.dto';
import { MockDeletedItemRepository } from './__mock__/deleted-item-repository.mock';

describe('unit test for DeletedItemsService', () => {
  let service: DeletedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletedItemsService,
        {
          provide: getRepositoryToken(DeletedItemsRepository),
          useValue: MockDeletedItemRepository,
        },
      ],
    }).compile();

    service = module.get<DeletedItemsService>(DeletedItemsService);
  });

  it('DeletedItemsService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('DeletedItemsService.create should create and add item to deleted item list', async () => {
    const item: DeletedItemDto = {
      deletionComment: 'no longer avaliable',
      itemId: 1,
      productCategory: 'electronics',
      title: 'freepod3',
      brand: 'oraimo',
      quantity: 1,
      price: 15000,
      currency: 'NGN',
      createdAt: new Date(),
    };
    const newDeletedItem = await service.create(item);
    expect(newDeletedItem).toMatchObject({
      id: expect.any(Number),
      itemId: expect.any(Number),
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

  it('DeletedItemsSerivce.isItemInBin should return true for an item in the list ', async () => {
    const item = await service.create({
      deletionComment: 'no longer avaliable',
      itemId: 5,
      productCategory: 'electronics',
      title: 'freepod3',
      brand: 'oraimo',
      quantity: 1,
      price: 8000,
      currency: 'NGN',
      createdAt: new Date(),
    });
    const isInBin = await service.isItemInBin(item.itemId);
    expect(isInBin).toBeTruthy();
  });

  it('DeletedItemsService.isItemInBin should return false for an item not in the list', async () => {
    const isInBin = await service.isItemInBin(20);
    expect(isInBin).toBeFalsy();
  });

  it('DeletedItemsService.getDeltedItems should return all the items in the list', async () => {
    const items = await service.getDeletedItems();
    expect(items).toBeDefined();
  });

  it('DeletedItemsService.restoreItem should remove the item from the list of deletedItems', async () => {
    const item = await service.create({
      deletionComment: 'no longer avaliable',
      itemId: 25,
      productCategory: 'electronics',
      title: 'freepod3',
      brand: 'oraimo',
      quantity: 1,
      price: 8000,
      currency: 'NGN',
      createdAt: new Date(),
    });
    const restoredItem = await service.restoreItem<InventoryItem>(item.itemId);
    const isItemInBin = await service.isItemInBin(item.itemId);
    expect(isItemInBin).toBeFalsy();
    expect(restoredItem).toBeDefined();
  });
});
