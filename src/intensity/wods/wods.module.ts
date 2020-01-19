import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WodsService } from '@intensity/wods/wods.service';
import { Wod } from '@intensity/wods/wod.entity';
import { WodsController } from './wods.controller';
import { ExercisesModule } from '@intensity/exercises/exercises.module';
import { TrainingsModule } from '@intensity/trainings/trainings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wod]),
    ExercisesModule,
    TrainingsModule,
  ],
  providers: [WodsService],
  controllers: [WodsController],
})
export class WodsModule {}
