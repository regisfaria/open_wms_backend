import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, user => user.id)
  @JoinTable({
    name: 'user_items',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'id' }],
  })
  user: User;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('int')
  minimumStock?: number;

  @Column('int')
  daysToNotifyExpirationDate?: number;

  @Column()
  image?: string;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  measureUnity: string;

  imageUrl?: string;
}
