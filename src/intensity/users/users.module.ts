import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@intensity/users/user.entity';
import { UsersService } from '@intensity/users/users.service';
import { UsersController } from '@intensity/users/users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterAvatarFactory } from '@app/shared/factories/multer-avatar.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.registerAsync({
      useClass: MulterAvatarFactory,
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
