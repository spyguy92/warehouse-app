import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goods } from './goods.entity';
import { Attributes } from 'sequelize';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(Goods) private goodsModel: typeof Goods) {}

  async create(userId: number, goods: { name: string; quantity: number; price: number }) {
    console.log('Creating goods:', { userId, goods });
    return this.goodsModel.create({ ...goods, userId } as Attributes<Goods>);
  }

  async findAll(userId: number) {
    console.log('Fetching goods for user:', userId);
    return this.goodsModel.findAll({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    console.log('Fetching goods:', { id, userId });
    return this.goodsModel.findOne({ where: { id, userId } });
  }

  async update(id: number, userId: number, goods: { name?: string; quantity?: number; price?: number }) {
    console.log('Updating goods:', { id, userId, goods });
    const item = await this.findOne(id, userId);
    if (!item) throw new Error('Goods not found');
    return item.update(goods);
  }

  async delete(id: number, userId: number) {
    console.log('Deleting goods:', { id, userId });
    const item = await this.findOne(id, userId);
    if (!item) throw new Error('Goods not found');
    return item.destroy();
  }
}