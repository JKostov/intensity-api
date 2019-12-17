import { IsEmail, IsString, Max, MaxLength, Min, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @MaxLength(50)
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsOptional()
  @Min(16)
  @Max(24)
  readonly trainingNum: number;
}
