import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './goods.entity';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';

@Module({
  imports: [SequelizeModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}