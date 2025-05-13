import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.entity';

@Table
export class Goods extends Model<Goods> {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number; 

  @Column
  name: string;

  @Column
  quantity: number;

  @Column
  price: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}