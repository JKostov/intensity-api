import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Wod } from '@intensity/wods/wod.entity';

@Exclude()
@Entity({
  name: 'exercises',
})
export class Exercise {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose()
  @Column({
    length: 50,
  })
  name: string;

  @Expose()
  @Column()
  repsNumber: number;

  @Expose()
  @Column()
  weight: number;

  @Expose()
  @Column()
  duration: number;

  @Expose()
  @ManyToOne(type => Wod, wod => wod.exercises)
  wod: Wod;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
