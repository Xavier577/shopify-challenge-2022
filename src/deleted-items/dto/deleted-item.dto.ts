import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class DeletedItemDto {
  @IsNumber()
  itemId: number;

  @IsString()
  deletionComment: string;

  @IsString()
  productCategory: string;

  @IsString()
  title: string;

  @IsString()
  brand: string;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;

  @IsNumber()
  quantity: number;

  @IsDate()
  createdAt: Date;
}
