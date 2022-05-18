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
} from '@nestjs/common';
import { InventoryItemsService } from './inventory-items.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';

@Controller('inventory-items')
export class InventoryItemsController {
  constructor(private readonly inventoryItemsService: InventoryItemsService) {}

  @Post('create')
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createInventoryItemDto: CreateInventoryItemDto,
  ) {
    return this.inventoryItemsService.create(createInventoryItemDto);
  }

  @Get()
  findAll() {
    return this.inventoryItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryItemsService.findById(id);
  }

  @Patch('edit/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryItemDto: UpdateInventoryItemDto,
  ) {
    const itemExist = this.inventoryItemsService.exists(id);
    if (!itemExist)
      throw new HttpException('item not found', HttpStatus.NOT_FOUND);
    return this.inventoryItemsService.update(id, updateInventoryItemDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const itemExist = this.inventoryItemsService.exists(id);
    if (!itemExist)
      throw new HttpException('item not found', HttpStatus.NOT_FOUND);
    return this.inventoryItemsService.remove(id);
  }
}
