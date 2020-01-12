import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '@intensity/auth/auth.service';
import { LoginDto } from '@intensity/auth/dto/login.dto';
import { RegisterDto } from '@intensity/auth/dto/register.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from '@intensity/users/user.entity';

const loginFailedMessage = 'Invalid email address or password.';
const registrationSuccessfulMessage = 'Registration successful.';
const registerFailedMessage = 'User already exists.';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @ApiOkResponse({ description: 'User login and returns the user with additional property `token`', type: User })
  @Post('/login')
  public async login(@Body() loginDto: LoginDto, @Res() res) {
    const loginSuccessDto = await this.authService.login(loginDto);

    if (!loginSuccessDto) {
      throw new HttpException(loginFailedMessage, HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.OK).json(loginSuccessDto);
  }

  @ApiOkResponse({ description: 'Registers a new user with the sent data' })
  @Post('/register')
  public async register(@Body() registerDto: RegisterDto, @Res() res) {
    const user = await this.authService.register(registerDto);

    if (!user) {
      throw new HttpException(registerFailedMessage, HttpStatus.BAD_REQUEST);
    }

    res.status(HttpStatus.OK).json({ message: registrationSuccessfulMessage });
  }
}
