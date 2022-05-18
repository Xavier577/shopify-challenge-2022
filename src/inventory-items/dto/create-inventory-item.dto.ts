import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryItemDto {
  @IsNotEmpty()
  @IsString()
  productCategory: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
