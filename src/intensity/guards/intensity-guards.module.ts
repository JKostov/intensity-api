import { Module } from '@nestjs/common';
import { AdminOrTrainerGuard } from './admin-or-trainer.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    AdminOrTrainerGuard,
  ],
  exports: [UsersModule],
})
export class IntensityGuardsModule {}
