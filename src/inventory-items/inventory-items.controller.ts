import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InventoryItemsService } from './inventory-items.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { DeletionCommentDto } from './dto/deletion-comment.dto';

@Controller('inventory-items')
export class InventoryItemsController {
  constructor(private readonly inventoryItemsService: InventoryItemsService) {}

  @Get()
  findAll() {
    return this.inventoryItemsService.findAll();
  }

  @Post('create')
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createInventoryItemDto: CreateInventoryItemDto,
  ) {
    return this.inventoryItemsService.create(createInventoryItemDto);
  }

  @Get('deleted-items')
  async getDeletedItems() {
    return this.inventoryItemsService.fetchDeletedItems();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const itemExists = await this.inventoryItemsService.exists(id);
    if (!itemExists) throw new NotFoundException('item not found');
    return this.inventoryItemsService.findById(id);
  }

  @Delete('delete/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    deletionCommentDto: DeletionCommentDto,
  ) {
    const itemExists = await this.inventoryItemsService.exists(id);
    if (!itemExists) throw new NotFoundException('item not found');
    await this.inventoryItemsService.remove(id, deletionCommentDto);
    return { message: `deleted item of index ${id}` };
  }

  @Patch('edit/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryItemDto: UpdateInventoryItemDto,
  ) {
    const itemExists = await this.inventoryItemsService.exists(id);
    if (!itemExists)
      throw new HttpException('item not found', HttpStatus.NOT_FOUND);
    return this.inventoryItemsService.update(id, updateInventoryItemDto);
  }

  @Get('deleted-items/restore/:id')
  async restoreDeletedItems(@Param('id', ParseIntPipe) id: number) {
    const isInBin = await this.inventoryItemsService.isItemADeletedItem(id);
    if (!isInBin)
      throw new NotFoundException(
        'item is not in bin or has been parmanently deleted',
      );
    return this.inventoryItemsService.restoreDeletedItem(id);
  }
}
