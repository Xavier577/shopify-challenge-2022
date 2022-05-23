import { Injectable } from '@nestjs/common';
import { DeletedItemsRepository } from './deleted-items.repository';
import { DeletedItemDto } from './dto/deleted-item.dto';

@Injectable()
export class DeletedItemsService {
  constructor(private readonly deletedItemRepository: DeletedItemsRepository) {}

  create(deletedItemDto: DeletedItemDto) {
    const deletedItem = this.deletedItemRepository.create(deletedItemDto);
    return this.deletedItemRepository.save(deletedItem);
  }

  isItemInBin(itemId: number): Promise<boolean> {
    return this.deletedItemRepository.itemIdExists(itemId);
  }

  getDeletedItems() {
    return this.deletedItemRepository.find();
  }

  async restoreItem<T>(itemId: number) {
    const deletedItem = await this.deletedItemRepository.findByItemIdAndDelete(
      itemId,
    );

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

      return restoredItem;
    }
  }
}
