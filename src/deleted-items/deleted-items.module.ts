import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletedItemsRepository } from './deleted-items.repository';
import { DeletedItemsService } from './deleted-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeletedItemsRepository])],
  providers: [DeletedItemsService],
  exports: [DeletedItemsService],
})
export class DeletedItemsModule {}
