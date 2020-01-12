import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly repsNumber: number;

  @IsOptional()
  @IsNumber()
  readonly weight: number;

  @IsOptional()
  @IsNumber()
  readonly duration: number;
}
