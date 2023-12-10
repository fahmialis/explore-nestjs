import { TaskStatus } from '../tasks-status.enum';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class FilterTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsString()
  @IsOptional()
  search: string;
}
