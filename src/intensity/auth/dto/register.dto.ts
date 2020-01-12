import { IsEmail, IsString, Max, MaxLength, Min, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  readonly lastName: string;

  @ApiProperty({
    type: 'email',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  readonly password: string;

  @ApiPropertyOptional({
    minimum: 16,
    maximum: 24,
  })
  @IsOptional()
  @Min(16)
  @Max(24)
  readonly trainingNum: number;
}
