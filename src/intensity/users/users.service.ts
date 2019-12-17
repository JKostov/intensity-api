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
