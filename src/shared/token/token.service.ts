import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@shared/token/token.interface';

@Injectable()
export class TokenService {
  private static saltRounds = 10;

  constructor(private readonly jwtService: JwtService) {
  }

  sign(payload: string | Buffer | object, options?: jwt.SignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  signAsync(payload: string | Buffer | object, options?: jwt.SignOptions): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  verify<T extends object = any>(token: string, options?: jwt.VerifyOptions): T {
    return this.jwtService.verify<T>(token, options);
  }

  verifyAsync<T extends object = any>(token: string, options?: jwt.VerifyOptions): Promise<T> {
    return this.jwtService.verifyAsync<T>(token, options);
  }

  decode(token: string, options?: jwt.DecodeOptions): null | {
    [key: string]: any;
  } | string {
    return this.jwtService.decode(token, options);
  }

  async verifyTokenAndGetData(token: string): Promise<Token> {
    let data = null;
    try {
      data = await this.jwtService.verifyAsync(token);
    } catch (e) {
      return null;
    }

    return data;
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, TokenService.saltRounds);
  }
}
