import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { FilterTasksDto } from './dto/filter-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException(`task with ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const found = await this.taskRepository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException(`task with ${id} not found`);
    }

    const result = await this.taskRepository.deleteTaskById(id);

    if (!result.affected) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<void> {
    const found = await this.taskRepository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException(`task with ${id} not found`);
    }

    const result = await this.taskRepository.updateTaskById(id, status);
    if (!result.affected) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }

  async getTasks(params: FilterTasksDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(params, user);
  }
}
