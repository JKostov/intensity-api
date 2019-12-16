import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@intensity/users/user.entity';
import { UserService } from '@intensity/users/users.service';
import { UsersController } from '@intensity/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
