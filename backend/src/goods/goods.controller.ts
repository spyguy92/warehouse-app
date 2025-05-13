import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('goods')
@UseGuards(AuthGuard('jwt'))
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Post()
  create(@Request() req, @Body() goods: { name: string; quantity: number; price: number }) {
    if (!req.user?.id) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    return this.goodsService.create(req.user.id, goods);
  }

  @Get()
  findAll(@Request() req) {
    if (!req.user?.id) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    return this.goodsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    if (!req.user?.id) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    return this.goodsService.findOne(+id, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Request() req, @Body() goods: { name?: string; quantity?: number; price?: number }) {
    if (!req.user?.id) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    return this.goodsService.update(+id, req.user.id, goods);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    if (!req.user?.id) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    return this.goodsService.delete(+id, req.user.id);
  }
}