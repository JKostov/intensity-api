import { Module } from '@nestjs/common';
import { AdminOrTrainerGuard } from './admin-or-trainer.guard';
import { UsersModule } from '../users/users.module';
import { AdminGuard } from '@intensity/guards/admin.guard';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    AdminOrTrainerGuard,
    AdminGuard,
  ],
  exports: [UsersModule],
})
export class IntensityGuardsModule {}
