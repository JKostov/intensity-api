import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInOutDto {
  @ApiProperty()
  @IsNumber()
  readonly trainingId: number;
}
