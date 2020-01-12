import { IsNumber } from 'class-validator';

export class SignInOutDto {
  @IsNumber()
  readonly trainingId: number;
}
