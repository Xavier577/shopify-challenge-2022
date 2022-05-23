import { Inject, Injectable } from '@nestjs/common';
import { DeletionCommentDto } from './dto/deletion-comment.dto';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { InventoryItemEntity } from './entities/inventory-item.entity';
import { DeletedItemsService } from '../deleted-items/deleted-items.service';
import { InventoryItemsRepository } from './inventory-items.repository';

@Injectable()
export class InventoryItemsService {
  constructor(
    private readonly inventoryItemsRepositry: InventoryItemsRepository,
    @Inject(DeletedItemsService)
    private readonly deletedItemsService: DeletedItemsService,
  ) {}

  create(
    createInventoryItemDto: CreateInventoryItemDto,
  ): Promise<InventoryItemEntity> {
    const item = this.inventoryItemsRepositry.create(createInventoryItemDto);
    return this.inventoryItemsRepositry.save(item);
  }

  findAll() {
    return this.inventoryItemsRepositry.find({ order: { id: 1 } });
  }

  findById(id: number) {
    return this.inventoryItemsRepositry.findById(id);
  }

  exists(id: number) {
    return this.inventoryItemsRepositry.exists(id);
  }

  async update(id: number, updateInventoryItemDto: UpdateInventoryItemDto) {
    return this.inventoryItemsRepositry.findByIdAndUpdate(
      id,
      updateInventoryItemDto,
    );
  }

  async remove(id: number, deletionCommentDto: DeletionCommentDto) {
    const item = await this.inventoryItemsRepositry.findByIdAndDelete(id);
    await this.deletedItemsService.create({
      deletionComment: deletionCommentDto.deletionComment,
      itemId: item.id,
      productCategory: item.productCategory,
      title: item.title,
      brand: item.brand,
      price: item.price,
      currency: item.currency,
      quantity: item.quantity,
      createdAt: item.createdAt,
    });

    return item;
  }

  async fetchDeletedItems() {
    return this.deletedItemsService.getDeletedItems();
  }

  async isItemADeletedItem(id: number) {
    return this.deletedItemsService.isItemInBin(id);
  }

  async restoreDeletedItem(id: number) {
    const restoredItem =
      await this.deletedItemsService.restoreItem<InventoryItemEntity>(id);
    if (restoredItem) {
      const item = this.inventoryItemsRepositry.create(restoredItem);

      return this.inventoryItemsRepositry.save(item);
    }
  }
}
