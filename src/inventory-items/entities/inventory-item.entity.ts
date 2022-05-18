import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'inventory_items' })
export class InventoryItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'product_category' })
  productCategory: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ default: new Date(), name: 'created_at' })
  createdAt: Date;

  @Column({ default: new Date(), name: 'upated_at' })
  updatedAt: Date;
}
