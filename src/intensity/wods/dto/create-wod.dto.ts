import { WodTrainingType } from '@intensity/wods/wod-training-type.enum';
import { WodGlobalType } from '@intensity/wods/wod-global-type.enum';
import { CreateExerciseDto } from '@intensity/exercises/dto/create-exercise.dto';
import { ArrayMinSize, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWodDto {

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsDateString()
  readonly date: Date;

  @IsNumber()
  readonly duration: number;

  @IsOptional()
  @IsNumber()
  readonly roundNumber: number;

  @IsOptional()
  @IsEnum(WodTrainingType)
  readonly trainingType: WodTrainingType;

  @IsString()
  readonly trainer: string;

  @IsEnum(WodGlobalType)
  readonly globalType: WodGlobalType;

  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  @ArrayMinSize(1)
  readonly exercises: CreateExerciseDto[];
}
