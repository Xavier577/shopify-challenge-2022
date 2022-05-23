import { EntityRepository, Repository } from 'typeorm';
import { InventoryItemEntity } from './entities/inventory-item.entity';
import type { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';

@EntityRepository(InventoryItemEntity)
export class InventoryItemsRepository extends Repository<InventoryItemEntity> {
  findById(id: number) {
    return this.findOne(id);
  }

  async exists(id: number) {
    const item = await this.findById(id);
    return item ? true : false;
  }

  async findByIdAndUpdate(id: number, fieldUpdate: UpdateInventoryItemDto) {
    const item = await this.findById(id);
    return this.save({
      ...item,
      ...fieldUpdate,
      updatedAt: new Date(),
    });
  }
  async findByIdAndDelete(id: number) {
    const item = this.findById(id);

    this.delete(id);

    return item;
  }
}
