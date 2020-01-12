import { IsBoolean } from 'class-validator';

export class UpdateStatusDto {
  @IsBoolean()
  readonly isActive: boolean;
}
