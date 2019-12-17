import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@intensity/users/user-role.enum';
import { Training } from '@intensity/trainings/training.entity';

@Exclude()
@Entity({
  name: 'users',
})
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose()
  @Column({
    length: 255,
  })
  name: string;

  @Expose()
  @Column({
    length: 255,
  })
  lastName: string;

  @Expose()
  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Expose()
  @Column()
  password: string;

  @Expose()
  @Column({
    default: false,
  })
  isActive: boolean;

  @Expose()
  @Column({
    length: 500,
    nullable: true,
  })
  about: string;

  @Expose()
  @Column()
  trainingNum: number;

  @Expose()
  @Column()
  role: UserRole;

  @ManyToMany(type => Training, training => training.users)
  @JoinTable({
    name: 'user_trainings',
  })
  trainings: Training[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
