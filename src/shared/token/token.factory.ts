import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@shared/config/config.service';

@Injectable()
export class TokenFactory implements JwtOptionsFactory {
  public static DefaultExpireTime = 3600;

  constructor(private readonly configService: ConfigService) {
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('JWT_SECRET_KEY'),
      signOptions: {
        expiresIn: this.getExpireTime(),
      },
    };
  }

  private getExpireTime(): number {
    const expireTime = this.configService.get('JWT_EXPIRE_TIME');
    const numberExpireTime = Number(expireTime);

    if (isNaN(numberExpireTime)) {
      return TokenFactory.DefaultExpireTime;
    }

    return numberExpireTime;
  }
}
