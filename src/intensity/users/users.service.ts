import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '@intensity/types/abstract.service';
import { UserRole } from '@intensity/users/user-role.enum';

@Injectable()
export class UsersService extends AbstractService<User> {
  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async getOneByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  async getAll(): Promise<User[]> {
    return this.repository.createQueryBuilder('u')
      .select(['u.id', 'u.name', 'u.lastName', 'u.email', 'u.about', 'u.trainingNum'])
      .getMany()
    ;
  }

  async getAllComplete(): Promise<User[]> {
    return super.getAll();
  }

  async getById(id: number): Promise<User> {
    return this.repository.createQueryBuilder('u')
      .select(['u.id', 'u.name', 'u.lastName', 'u.email', 'u.about', 'u.trainingNum'])
      .where('u.id = :id', { id })
      .getOne()
    ;
  }

  async getByIdComplete(id: number): Promise<User> {
    return super.getById(id);
  }

  async create(user: User): Promise<User> {
    if (!user.trainingNum) {
      user.trainingNum = 16;
    }

    if (!user.role) {
      user.role = UserRole.user;
    }

    return await this.repository.save(user);
  }
}
