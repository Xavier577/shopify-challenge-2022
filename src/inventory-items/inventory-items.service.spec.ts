import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeletedItemEntity } from './entities/deleted-item.entity';
import { InventoryItemEntity } from './entities/inventory-item.entity';
import { InventoryItemsService } from './inventory-items.service';
import { mockDeletedItemRepository } from './__mock__/deleted-items.mock';
import { mockInventoryItemRepository } from './__mock__/inventory-items.mock';

describe('InventoryItemsService', () => {
  let service: InventoryItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryItemsService,
        {
          provide: getRepositoryToken(InventoryItemEntity),
          useValue: mockInventoryItemRepository,
        },
        {
          provide: getRepositoryToken(DeletedItemEntity),
          useValue: mockDeletedItemRepository,
        },
      ],
    }).compile();

    service = module.get<InventoryItemsService>(InventoryItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create inventory item', async () => {
    const item = await service.create({
      productCategory: 'electronics',
      title: 'freepod3',
      brand: 'oraimo',
      quantity: 1,
      price: 15000,
      currency: 'NGN',
    });

    expect(item).toBeDefined();
    // expect(item).toEqual({
    //   productCategory: 'electronics',
    //   title: 'freepod3',
    //   brand: 'oraimo',
    //   quantity: 1,
    //   price: 15000,
    //   currency: 'NGN',
    // });
  });
});
