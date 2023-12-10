import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { FilterTasksDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id);

    if (!found) {
      throw new NotFoundException(`task with ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.deleteTaskById(id);

    if (!result.affected) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }

  async updateTaskById(id: string, status: TaskStatus): Promise<void> {
    const result = await this.taskRepository.updateTaskById(id, status);

    if (!result.affected) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }

  async getTasks(params: FilterTasksDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(params);
  }
}
