import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@shared/config/config.service';
import { Token, TokenWithExpiration } from '@shared/token/token.interface';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  validate(payload: TokenWithExpiration): Token {
    const { id, email } = payload;

    return { id, email };
  }
}
