import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Goods } from '../goods/goods.entity';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ unique: true })
  declare email: string; 

  @Column
  declare password: string; 

  @HasMany(() => Goods)
  goods: Goods[];
}