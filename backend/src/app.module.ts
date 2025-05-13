import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { GoodsModule } from './goods/goods.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST || 'db',
      port: +(process.env.DATABASE_PORT || 5432), // Use default 5432 if undefined
      username: process.env.DATABASE_USER || 'admin',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'warehouse',
      autoLoadModels: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    GoodsModule,
    UsersModule,
  ],
})
export class AppModule {}