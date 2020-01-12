import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@intensity/users/user-role.enum';
import { Training } from '@intensity/trainings/training.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Exclude()
@Entity({
  name: 'users',
})
export class User {

  @ApiResponseProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiResponseProperty()
  @Expose()
  @Column({
    length: 255,
  })
  name: string;

  @ApiResponseProperty()
  @Expose()
  @Column({
    length: 255,
  })
  lastName: string;

  @ApiResponseProperty()
  @Expose()
  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Expose()
  @Column()
  password: string;

  @ApiResponseProperty()
  @Expose()
  @Column({
    default: false,
  })
  isActive: boolean;

  @ApiResponseProperty()
  @Expose()
  @Column({
    length: 500,
    nullable: true,
  })
  about: string;

  @ApiResponseProperty()
  @Expose()
  @Column()
  trainingNum: number;

  @ApiResponseProperty({
    enum: UserRole,
  })
  @Expose()
  @Column()
  role: UserRole;

  @ApiResponseProperty({
    type: [Training],
  })
  @ManyToMany(type => Training, training => training.users)
  @JoinTable({
    name: 'user_trainings',
  })
  trainings: Training[];

  @ApiResponseProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
