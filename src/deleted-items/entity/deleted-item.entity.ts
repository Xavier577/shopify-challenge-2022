import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'deleted_items' })
export class DeletedItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'item_id' })
  itemId: number;

  @Column({ nullable: true, name: 'deletionComment' })
  deletionComment: string;

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

  @Column({ nullable: false, name: 'created_at' })
  createdAt: Date;

  @Column({ default: new Date(), name: 'upated_at' })
  updatedAt: Date;
}
