import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from '@shared/token/token.service';
import { Token } from '@shared/token/token.interface';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoggedGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    const tokenData: Token = await this.tokenService.verifyTokenAndGetData(token);

    if (tokenData) {
      request.user = tokenData;
      return true;
    }

    return false;
  }

  handleRequest(err, user, info) {

    console.log(err);
    console.log(user);
    console.log(info);
    // no error is thrown if no user is found
    // You can use info for logging (e.g. token is expired etc.)
    // e.g.: if (info instanceof TokenExpiredError) ...
    return user;
  }
}
