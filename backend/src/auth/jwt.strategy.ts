import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    if (!payload.sub || !payload.email) {
      console.log('Invalid JWT payload:', payload);
      throw new UnauthorizedException('Invalid JWT payload');
    }
    return { id: payload.sub, email: payload.email };
  }
}