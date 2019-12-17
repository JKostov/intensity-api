import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingsService } from '@intensity/trainings/trainings.service';
import { Training } from '@intensity/trainings/training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  providers: [TrainingsService],
})
export class TrainingsModule {}
