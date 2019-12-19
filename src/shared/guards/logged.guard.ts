import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { TokenService } from '@shared/token/token.service';
import { Token } from '@shared/token/token.interface';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info) {

    if (user === false) {
      throw new ForbiddenException(info.message);
    }

    return user;
  }
}
