import { Module } from '@nestjs/common';
import { IntensityModule } from '@intensity/intensity.module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [IntensityModule, SharedModule],
})
export class AppModule {}
