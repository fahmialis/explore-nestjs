import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  // forFeature is for each feature/sub-module
  // imports allows dependency injection
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
})
export class TasksModule {}
