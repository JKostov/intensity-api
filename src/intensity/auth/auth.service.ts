import { Injectable } from '@nestjs/common';
import { LoginDto } from '@intensity/auth/dto/login.dto';
import { UsersService } from '@intensity/users/users.service';
import { TokenService } from '@shared/token/token.service';
import { Token } from '@shared/token/token.interface';
import { LoginSuccess } from '@intensity/auth/dto/login-success.type';
import { RegisterDto } from '@intensity/auth/dto/register.dto';
import { User } from '@intensity/users/user.entity';
import { plainToClass } from 'class-transformer';
import { UserRole } from '@intensity/users/user-role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly tokenService: TokenService) {
  }

  async login(loginDto: LoginDto): Promise<LoginSuccess> {
    const user = await this.usersService.getOneByEmail(loginDto.email);

    if (!user) {
      return null;
    }

    const result = await this.tokenService.compareHash(loginDto.password, user.password);

    if (!result) {
      return null;
    }

    delete user.password;

    const tokenData: Token = { id: user.id, email: user.email };

    const token = await this.tokenService.signAsync(tokenData);

    return { ...user, token };
  }

  async register(userData: RegisterDto): Promise<User> {

    const existing = await this.usersService.getOneByEmail(userData.email);

    if (existing) {
      return null;
    }

    const user = plainToClass(User, userData);

    user.password = await this.tokenService.generateHash(user.password);
    user.role = UserRole.user;
    if (userData.role) {
      user.role = userData.role;
    }

    return await this.usersService.create(user);
  }
}
