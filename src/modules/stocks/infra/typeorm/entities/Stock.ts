import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { Item } from '@modules/items/infra/typeorm/entities/Item';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Item, item => item.id)
  @JoinTable({
    name: 'item_stocks',
    joinColumns: [{ name: 'itemId' }],
    inverseJoinColumns: [{ name: 'id' }],
  })
  item: Item;

  @Column('uuid')
  itemId: string;

  @Column()
  type: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  value: number;

  @Column('timestamp')
  expirationDate?: Date;

  @Column('boolean')
  notified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
