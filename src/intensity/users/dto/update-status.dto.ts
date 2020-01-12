import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;
}
