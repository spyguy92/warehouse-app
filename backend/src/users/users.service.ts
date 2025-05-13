import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import { Attributes } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOneByEmail(email: string): Promise<User | null> {
    console.log('Finding user by email:', email);
    const user = await this.userModel.findOne({ where: { email } });
    console.log('User found:', user ? { id: user.id, email: user.email, password: !!user.password } : null);
    return user;
  }

  async create(user: { email: string; password: string }): Promise<User> {
    console.log('Creating user with data:', { email: user.email, password: user.password ? 'provided' : 'missing' });
    const createdUser = await this.userModel.create(user as Attributes<User>);
    console.log('User created in database:', { id: createdUser.id, email: createdUser.email, password: !!createdUser.password });
    return createdUser;
  }
}