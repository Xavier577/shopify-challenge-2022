import { Module } from '@nestjs/common';
import { InventoryItemsService } from './inventory-items.service';
import { InventoryItemsController } from './inventory-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItemEntity } from './entities/inventory-item.entity';
import { DeletedItemEntity } from './entities/deleted-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItemEntity, DeletedItemEntity])],
  controllers: [InventoryItemsController],
  providers: [InventoryItemsService],
})
export class InventoryItemsModule {}
