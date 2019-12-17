import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule,
    TokenModule,
  ],
  exports: [
    ConfigModule,
    TokenModule,
  ],
})
export class SharedModule {}
