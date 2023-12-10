import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    console.log(title, description);

    // create the object
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // save the object into the database
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    // if not found return 404

    return await this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }
}
