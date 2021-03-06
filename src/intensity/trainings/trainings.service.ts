import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from '@intensity/trainings/training.entity';
import { AbstractService } from '@intensity/types/abstract.service';
import { Token } from '@shared/token/token.interface';
import { SignInOutDto } from '@intensity/trainings/dto/sign-in-out.dto';
import { UsersService } from '@intensity/users/users.service';

@Injectable()
export class TrainingsService extends AbstractService<Training> {
  constructor(@InjectRepository(Training) trainingsRepository: Repository<Training>, private readonly usersService: UsersService) {
    super(trainingsRepository);
  }

  async getByDate(date: string): Promise<Training> {

    const training = await this.repository.createQueryBuilder('t')
      .select(['t', 'u.id', 'u.name', 'u.lastName'])
      .where('t.date = :date', { date })
      .leftJoinAndSelect('t.wod', 'w', 't.wod = w.id')
      .leftJoinAndSelect('w.exercises', 'e', 'e.wod = w.id')
      .leftJoin('t.users', 'u')
      .getOne();

    if (!training) {
      throw new NotFoundException('Training does not exist.');
    }
    
    training.users = training.users.map(u => ({ ...u, name: `${u.name} ${u.lastName}` }));

    return training;
  }

  async singUserToTraining(userToken: Token, signInOutDto: SignInOutDto): Promise<number[]> {
    const training = await this.repository.findOne(signInOutDto.trainingId, { relations: ['users'] });
    const signedUser = training.users.find(u => u.id === userToken.id);

    if (signedUser) {
      throw new BadRequestException('User already signed for this training');
    }

    const user = await this.usersService.signForTraining(userToken);

    if (!user) {
      throw new BadRequestException('No more trainings.');
    }

    training.users.push(user);
    await this.repository.save(training);

    return await this.usersService.getTrainingIds(user.id);
  }

  async singOutUserFromTraining(userToken: Token, signInOutDto: SignInOutDto): Promise<number[]> {
    const user = await this.usersService.signOutFromTraining(userToken);

    const training = await this.repository.findOne(signInOutDto.trainingId, { relations: ['users'] });
    training.users.splice(training.users.findIndex(u => u.id === user.id), 1);
    await this.repository.save(training);

    return await this.usersService.getTrainingIds(user.id);
  }

  async saveTrainings(trainings: Training[]): Promise<Training[]> {
    return await this.repository.save((trainings));
  }

  async deleteTrainings(trainings: Training[]): Promise<void> {
    await this.repository.delete(trainings.map(t => t.id));
  }
}
