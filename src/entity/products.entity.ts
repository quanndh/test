import { PaginationBase } from '@interfaces/pagination';
import { Transaction } from '@/entity/transaction.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column('numeric')
  price: number;

  @OneToMany(() => Transaction, trans => trans.product)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export class ProductConnection extends PaginationBase<Product> {}
