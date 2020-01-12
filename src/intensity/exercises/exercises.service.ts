import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '@intensity/exercises/exercise.entity';
import { AbstractService } from '@intensity/types/abstract.service';

@Injectable()
export class ExercisesService extends AbstractService<Exercise> {
  constructor(@InjectRepository(Exercise) trainingsRepository: Repository<Exercise>) {
    super(trainingsRepository);
  }

  async deleteExercises(exercises: Exercise[]): Promise<void> {
    await this.repository.delete(exercises.map(e => e.id));
  }
}
