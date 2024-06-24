import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersDB } from 'src/dataBase/users/usersDB';
import { v4 } from 'uuid';
import { IsUUID } from 'class-validator';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const id = v4();
    const date = new Date().getTime();
    const newUser = {
      id,
      login: createUserDto.login,
      password: createUserDto.password,
      version: 0.1,
      createdAt: date,
      updatedAt: date,
    };
    usersDB.push(newUser);
    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  findAll() {
    const usersResponde = usersDB.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return usersResponde;
  }

  findOne(id: string) {
    const user = usersDB.find((user) => user.id === id);
    if (!user) return false;
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = usersDB.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    if (user.password === updateUserDto.oldPassword) {
      user.password = updateUserDto.newPassword;
      user.updatedAt = new Date().getTime();
      user.version += 0.1;
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } else {
      throw new ForbiddenException('Incorrect old password.'); // Throw HttpException with 403 status
    }
  }

  remove(id: string) {
    const indexToRemove = usersDB.findIndex((obj) => obj.id === id);
    if (indexToRemove > -1) {
      usersDB.splice(indexToRemove, 1);
      return true;
    } else {
      return false;
    }
  }
}
