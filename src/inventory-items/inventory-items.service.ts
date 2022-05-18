import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { DeletedItemEntity } from './entities/deleted-item.entity';
import { InventoryItemEntity } from './entities/inventory-item.entity';

@Injectable()
export class InventoryItemsService {
  constructor(
    @InjectRepository(InventoryItemEntity)
    private readonly inventoryItemsRepositry: Repository<InventoryItemEntity>,
    @InjectRepository(DeletedItemEntity)
    private readonly deletedItemsRepositry: Repository<DeletedItemEntity>,
  ) {}

  create(
    createInventoryItemDto: CreateInventoryItemDto,
  ): Promise<InventoryItemEntity> {
    const item = new InventoryItemEntity();
    item.productCategory = createInventoryItemDto.productCategory;
    item.title = createInventoryItemDto.title;
    item.brand = createInventoryItemDto.brand;
    item.price = createInventoryItemDto.price;
    item.currency = createInventoryItemDto.currency;
    item.quantity = createInventoryItemDto.quantity;

    return this.inventoryItemsRepositry.save(item);
  }

  findAll() {
    return this.inventoryItemsRepositry.find();
  }

  findById(id: number) {
    return this.inventoryItemsRepositry.findOne(id);
  }

  async exists(id: number) {
    const item = await this.inventoryItemsRepositry.findOne(id);
    return item == null;
  }

  async update(id: number, updateInventoryItemDto: UpdateInventoryItemDto) {
    const item = await this.inventoryItemsRepositry.findOne(id);
    for (const prop in updateInventoryItemDto) {
      item[prop] = updateInventoryItemDto[prop];
    }
    return this.inventoryItemsRepositry.save(item);
  }

  remove(id: number) {
    return this.inventoryItemsRepositry.delete(id);
  }
}
