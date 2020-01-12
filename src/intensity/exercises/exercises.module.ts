import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from '@intensity/exercises/exercises.service';
import { Exercise } from '@intensity/exercises/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
