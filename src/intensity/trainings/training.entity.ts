import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Wod } from '@intensity/wods/wod.entity';
import { User } from '@intensity/users/user.entity';

@Exclude()
@Entity({
  name: 'trainings',
})
export class Training {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose()
  @Column()
  date: Date;

  @Expose()
  @ManyToOne(type => Wod, wod => wod.trainings)
  wod: Wod;

  @ManyToMany(type => User, user => user.trainings)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
