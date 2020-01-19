import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseDto {

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly repsNumber: number;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly weight: number;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly duration: number;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsString()
  readonly link: string;
}
