import { Module } from '@nestjs/common';
import { LoggedGuard } from './logged.guard';
import { TokenModule } from '@shared/token/token.module';

@Module({
  imports: [
    TokenModule,
  ],
  providers: [
    LoggedGuard,
  ],
  exports: [TokenModule],
})
export class GuardsModule {}
