import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WodsService } from '@intensity/wods/wods.service';
import { Wod } from '@intensity/wods/wod.entity';
import { WodsController } from './wods.controller';
import { ExercisesModule } from '@intensity/exercises/exercises.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wod]),
    ExercisesModule,
  ],
  providers: [WodsService],
  controllers: [WodsController],
})
export class WodsModule {}
