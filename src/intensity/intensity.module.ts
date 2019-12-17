import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WodsModule } from './wods/wods.module';
import { TrainingsModule } from './trainings/trainings.module';
import { ExercisesModule } from './exercises/exercises.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    WodsModule,
    TrainingsModule,
    ExercisesModule,
    AuthModule,
  ],
})
export class IntensityModule {}
