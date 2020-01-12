import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Wod } from '@intensity/wods/wod.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Exclude()
@Entity({
  name: 'exercises',
})
export class Exercise {

  @ApiResponseProperty()
  @Expose()
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
  repsNumber: number;

  @ApiResponseProperty()
  @Expose()
  @Column()
  weight: number;

  @ApiResponseProperty()
  @Expose()
  @Column()
  duration: number;

  @ApiResponseProperty({ type: () => Wod })
  @Expose()
  @ManyToOne(type => Wod, wod => wod.exercises)
  wod: Wod;

  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
