import { EntityRepository, Repository } from 'typeorm';
import { DeletedItemEntity } from './entity/deleted-item.entity';

@EntityRepository(DeletedItemEntity)
export class DeletedItemsRepository extends Repository<DeletedItemEntity> {
  findByItemId(itemId: number) {
    return this.findOne({ where: { itemId } });
  }

  async itemIdExists(itemId: number) {
    const itemInBin = await this.findByItemId(itemId);
    return itemInBin ? true : false;
  }

  async findByItemIdAndDelete(itemId: number) {
    const deletedItem = this.findByItemId(itemId);
    if (deletedItem) {
      await this.delete(itemId);
      return deletedItem;
    }
  }
}
