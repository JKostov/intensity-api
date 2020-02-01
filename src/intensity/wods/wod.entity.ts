import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { WodTrainingType } from '@intensity/wods/wod-training-type.enum';
import { WodGlobalType } from '@intensity/wods/wod-global-type.enum';
import { Training } from '@intensity/trainings/training.entity';
import { Exercise } from '@intensity/exercises/exercise.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Exclude()
@Entity({
  name: 'wods',
})
export class Wod {

  @ApiResponseProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiResponseProperty()
  @Expose()
  @Column({
    length: 50,
  })
  name: string;

  @ApiResponseProperty()
  @Expose()
  @Column()
  date: Date;

  @ApiResponseProperty()
  @Expose()
  @Column()
  duration: number;

  @ApiResponseProperty()
  @Expose()
  @Column()
  roundNumber: number;

  @ApiResponseProperty({ enum: WodTrainingType })
  @Expose()
  @Column()
  trainingType: WodTrainingType;

  @ApiResponseProperty()
  @Expose()
  @Column({
    length: 255,
  })
  trainer: string;

  @ApiResponseProperty({ enum: WodGlobalType })
  @Expose()
  @Column()
  globalType: WodGlobalType;

  @ApiResponseProperty({ type: [Training] })
  @OneToMany(type => Training, training => training.wod, { cascade: true })
  trainings: Training[];

  @ApiResponseProperty({ type: [Exercise] })
  @OneToMany(type => Exercise, exercise => exercise.wod, { cascade: true })
  exercises: Exercise[];

  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
