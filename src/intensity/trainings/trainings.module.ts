import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingsService } from '@intensity/trainings/trainings.service';
import { Training } from '@intensity/trainings/training.entity';
import { TrainingsController } from './trainings.controller';
import { UsersModule } from '@intensity/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training]),
    UsersModule,
  ],
  providers: [TrainingsService],
  controllers: [TrainingsController],
})
export class TrainingsModule {}
