import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@intensity/users/user-role.enum';

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

  // @Expose()
  // @Column({
  //   nullable: true,
  // })
  // registrationToken: string;
  //
  // @OneToMany(type => PasswordReset, passwordReset => passwordReset.user)
  // passwordResets: PasswordReset[];
  //
  // @OneToMany(type => Note, note => note.user)
  // notes: Note[];
  //
  // @OneToMany(type => Collaboration, collaboration => collaboration.user)
  // ownedCollaborations: Collaboration[];
  //
  // @ManyToMany(type => Collaboration, collaboration => collaboration.collaborators)
  // @JoinTable({
  //   name: 'users_collaborations',
  // })
  // collaborations: Collaboration[];

  // @ManyToMany(type => User, user => user.followers)
  // @JoinTable()
  // following: User[];
  //
  // @ManyToMany(type => User, user => user.following)
  // followers: User[];
  //
  // @ManyToMany(type => Note, note => note.usersBookmarkedNote)
  // @JoinTable({
  //   name: 'users_bookmarked_notes',
  // })
  // bookmarkedNotes: Note[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
