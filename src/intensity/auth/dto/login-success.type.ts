import { User } from '@intensity/users/user.entity';

export type LoginSuccess = User & { token: string };
