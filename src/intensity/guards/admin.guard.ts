import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '@intensity/users/users.service';
import { Token } from '@shared/token/token.interface';
import { UserRole } from '@intensity/users/user-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private usersService: UsersService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userToken: Token = request.user;
    const user = await this.usersService.getByIdComplete(userToken.id);

    if (!user) {
      throw new BadRequestException();
    }

    return user.role === UserRole.admin;
  }
}
