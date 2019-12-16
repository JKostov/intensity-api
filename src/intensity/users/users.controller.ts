import { Controller, Inject } from '@nestjs/common';
import { UserService } from '@intensity/users/users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UserService) private readonly userService: UserService) { }
}
