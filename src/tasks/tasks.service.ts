import { Injectable } from '@nestjs/common';
// import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTaskById(id: string): Promise<Task> {
    // if not found return 404

    const found = await this.taskRepository.getTaskById(id);

    if (!found) {
      throw new NotFoundException(`task with ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // deleteTaskById(id: string) {
  //   const deletedIndex = this.tasks.findIndex((task) => {
  //     return task.id === id;
  //   });
  //   if (deletedIndex !== -1) {
  //     this.tasks.splice(deletedIndex, 1);
  //   } else {
  //     throw new NotFoundException();
  //   }
  // }

  // updateTaskById(id: string, target: string): Task {
  //   const task = this.getTaskById(id);
  //   task.target = target;
  //   return task;
  // }
}
