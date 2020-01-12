import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Wod } from '@intensity/wods/wod.entity';
import { User } from '@intensity/users/user.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Exclude()
@Entity({
  name: 'trainings',
})
export class Training {

  @ApiResponseProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiResponseProperty()
  @Expose()
  @Column()
  date: Date;

  @ApiResponseProperty({ type: () => [Wod] })
  @Expose()
  @ManyToOne(type => Wod, wod => wod.trainings)
  wod: Wod;

  @ApiResponseProperty({ type: () => [User] })
  @ManyToMany(type => User, user => user.trainings)
  users: User[];

  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
