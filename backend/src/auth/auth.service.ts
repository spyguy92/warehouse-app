import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user:', { email, passwordProvided: !!password });
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      console.log('User not found for email:', email);
      return null;
    }
    if (!user.password) {
      console.log('User password is missing in database for email:', email);
      return null;
    }
    if (!password) {
      console.log('No password provided for login');
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      console.log('Password valid for user:', email);
      const { password, ...result } = user.toJSON();
      return result;
    }
    console.log('Password invalid for user:', email);
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string) {
    console.log('Registering user:', { email, passwordProvided: !!password });
    if (!email || !password) {
      console.log('Missing email or password:', { email, password });
      throw new Error('Email and password are required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password for registration:', hashedPassword);
    const user = await this.usersService.create({ email, password: hashedPassword });
    console.log('User created:', { id: user.id, email: user.email });
    return user;
  }
}