import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // hash password
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);

    // create the object
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      // save the object into the database
      await this.usersRepository.save(user);
    } catch (error) {
      // duplicate user
      if (error.code === '23505') {
        throw new ConflictException(`${error?.detail}`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUser(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
}
