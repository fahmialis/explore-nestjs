import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterTasksDto } from './dto/filter-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;

    // create the object
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    // save the object into the database
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.taskRepository.findOne({
      where: {
        id,
        user,
      },
    });
  }

  async deleteTaskById(id: string) {
    return await this.taskRepository.delete(id);
  }

  async updateTaskById(id: string, status: TaskStatus) {
    return await this.taskRepository.update(id, { status });
  }

  async getTasks(params: FilterTasksDto, user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    const { status, search } = params;

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
