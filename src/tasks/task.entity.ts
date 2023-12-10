// .entity file will be automatically detected by typeorm
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

// define class as entity
@Entity()
export class Task {
  // mark column as primary column
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
