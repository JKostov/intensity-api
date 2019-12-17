import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from '@intensity/trainings/training.entity';
import { AbstractService } from '@intensity/types/abstract.service';

@Injectable()
export class TrainingsService extends AbstractService<Training> {
  constructor(@InjectRepository(Training) trainingsRepository: Repository<Training>) {
    super(trainingsRepository);
  }
}
