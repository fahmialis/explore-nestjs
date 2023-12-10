import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  // Delete,
  // Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTaskByid(@Param('id') id: string) {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch('/:id')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { target } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskById(id, target);
  // }
}
