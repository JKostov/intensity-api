import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wod } from '@intensity/wods/wod.entity';
import { AbstractService } from '@intensity/types/abstract.service';
import { CreateWodDto } from '@intensity/wods/dto/create-wod.dto';
import { plainToClass } from 'class-transformer';
import { Exercise } from '@intensity/exercises/exercise.entity';
import { WodTrainingType } from '@intensity/wods/wod-training-type.enum';
import { ExercisesService } from '@intensity/exercises/exercises.service';
import { WodGlobalType } from '@intensity/wods/wod-global-type.enum';
import { Training } from '@intensity/trainings/training.entity';
import { TrainingsService } from '@intensity/trainings/trainings.service';

@Injectable()
export class WodsService extends AbstractService<Wod> {
  constructor(@InjectRepository(Wod) wodsRepository: Repository<Wod>, private exercisesService: ExercisesService,
              private trainingsService: TrainingsService) {
    super(wodsRepository);
  }

  async createNew(createWodDto: CreateWodDto): Promise<Wod> {

    const wod = plainToClass(Wod, createWodDto);
    wod.exercises = createWodDto.exercises.map(e => plainToClass(Exercise, e));

    this.checkAndSetWodProperties(wod);

    const trainings: Training[] = [];
    if (wod.globalType === WodGlobalType.crossfit) {
      const training4 = new Training();
      training4.date = new Date(wod.date);
      training4.date.setHours(16);
      training4.wod = wod;
      trainings.push(training4);

      const training6 = new Training();
      training6.date = new Date(wod.date);
      training6.date.setHours(18);
      training6.wod = wod;
      trainings.push(training6);

      const training8 = new Training();
      training8.date = new Date(wod.date);
      training8.date.setHours(20);
      training8.wod = wod;
      trainings.push(training8);
    } else {
      const training5 = new Training();
      training5.date = new Date(wod.date);
      training5.date.setHours(17);
      training5.wod = wod;
      trainings.push(training5);

      const training7 = new Training();
      training7.date = new Date(wod.date);
      training7.date.setHours(19);
      training7.wod = wod;
      trainings.push(training7);
    }

    await this.repository.save(wod);

    await this.trainingsService.saveTrainings(trainings);

    return wod;
  }

  async update(id: number, createWodDto: CreateWodDto): Promise<Wod> {

    const wod = await this.repository.findOne(id, { relations: ['exercises'] });

    if (!wod) {
      throw new NotFoundException('Wod not found.');
    }

    const updateWod = plainToClass(Wod, createWodDto);
    updateWod.exercises = createWodDto.exercises.map(e => plainToClass(Exercise, e));

    const exercisesToDelete = wod.exercises.filter(e => !updateWod.exercises.find(ue => ue.id === e.id));

    await this.exercisesService.deleteExercises(exercisesToDelete);
    this.updateWodProperties(wod, updateWod);
    this.checkAndSetWodProperties(wod);

    return await this.repository.save(wod);
  }

  async delete(id: number): Promise<Wod> {
    const wod = await this.repository.findOne(id, { relations: ['exercises'] });

    if (!wod) {
      throw new NotFoundException('Wod not found.');
    }

    if (wod.exercises.length > 0) {
      await this.exercisesService.deleteExercises(wod.exercises);
    }
    await this.repository.delete(wod.id);

    return wod;
  }

  private updateWodProperties(wod: Wod, updateWod: Wod): void {
    wod.name = updateWod.name;
    wod.date = updateWod.date;
    wod.duration = updateWod.duration;
    wod.roundNumber = updateWod.roundNumber;
    wod.trainingType = updateWod.trainingType;
    wod.trainer = updateWod.trainer;
    wod.globalType = updateWod.globalType;

    wod.exercises = updateWod.exercises;
  }

  private checkAndSetWodProperties(wod: Wod): void {
    if (!wod.name) {
      wod.name = 'Custom';
    }

    if (!wod.roundNumber) {
      wod.roundNumber = 0;
    }

    if (!wod.trainingType) {
      wod.trainingType = WodTrainingType.custom;
    }

    wod.exercises.forEach(e => this.checkAndSetExerciseProperties(e));
  }

  private checkAndSetExerciseProperties(exercise: Exercise): void {
    if (!exercise.repsNumber) {
      exercise.repsNumber = 0;
    }

    if (!exercise.weight) {
      exercise.weight = 0;
    }

    if (!exercise.duration) {
      exercise.duration = 0;
    }
  }
}
