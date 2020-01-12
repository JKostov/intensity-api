import { WodTrainingType } from '@intensity/wods/wod-training-type.enum';
import { WodGlobalType } from '@intensity/wods/wod-global-type.enum';
import { CreateExerciseDto } from '@intensity/exercises/dto/create-exercise.dto';
import { ArrayMinSize, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWodDto {

  @ApiPropertyOptional({
    default: 'Custom',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsDateString()
  readonly date: Date;

  @ApiProperty()
  @IsNumber()
  readonly duration: number;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly roundNumber: number;

  @ApiPropertyOptional({
    enum: WodTrainingType,
    default: WodTrainingType.custom,
  })
  @IsOptional()
  @IsEnum(WodTrainingType)
  readonly trainingType: WodTrainingType;

  @ApiProperty()
  @IsString()
  readonly trainer: string;

  @ApiProperty({
    enum: WodGlobalType,
  })
  @IsEnum(WodGlobalType)
  readonly globalType: WodGlobalType;

  @ApiProperty({
    minItems: 1,
    type: CreateExerciseDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  @ArrayMinSize(1)
  readonly exercises: CreateExerciseDto[];
}
