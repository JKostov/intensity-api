import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { WodTrainingType } from '@intensity/wods/wod-training-type.enum';
import { WodGlobalType } from '@intensity/wods/wod-global-type.enum';
import { Training } from '@intensity/trainings/training.entity';
import { Exercise } from '@intensity/exercises/exercise.entity';

@Exclude()
@Entity({
  name: 'wods',
})
export class Wod {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose()
  @Column({
    length: 50,
  })
  name: string;

  @Expose()
  @Column()
  date: Date;

  @Expose()
  @Column()
  duration: number;

  @Expose()
  @Column()
  roundNumber: number;

  @Expose()
  @Column()
  trainingType: WodTrainingType;

  @Expose()
  @Column({
    length: 255,
  })
  trainer: string;

  @Expose()
  @Column()
  globalType: WodGlobalType;

  @OneToMany(type => Training, training => training.wod)
  trainings: Training[];

  @OneToMany(type => Exercise, exercise => exercise.wod, { cascade: true })
  exercises: Exercise[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
