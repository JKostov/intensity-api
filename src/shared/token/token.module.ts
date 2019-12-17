import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule } from '@shared/config/config.module';
import { TokenFactory } from '@shared/token/token.factory';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: TokenFactory,
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
