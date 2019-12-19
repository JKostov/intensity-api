import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@intensity/users/users.module';
import { SharedModule } from '@shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { JwtPassportStrategy } from '@intensity/auth/jwt-passport.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
    UsersModule,
  ],
  providers: [AuthService, JwtPassportStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
