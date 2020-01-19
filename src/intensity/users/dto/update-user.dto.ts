import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
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

  @ApiPropertyOptional({
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  readonly about: string;
}
