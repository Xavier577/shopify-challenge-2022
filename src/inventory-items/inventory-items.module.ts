import { Module } from '@nestjs/common';
import { InventoryItemsService } from './inventory-items.service';
import { InventoryItemsController } from './inventory-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletedItemsModule } from '../deleted-items/deleted-items.module';
import { InventoryItemsRepository } from './inventory-items.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryItemsRepository]),
    DeletedItemsModule,
  ],
  controllers: [InventoryItemsController],
  providers: [InventoryItemsService],
})
export class InventoryItemsModule {}
