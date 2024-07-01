import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    delete user.password;
    const newUser = {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
    return newUser;
  }

  async findAll() {
    const usersResponde = await this.prisma.user.findMany();
    const usersWithoutPassword = usersResponde.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`Cat with ID ${id} not found`);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    if (user.password === updateUserDto.oldPassword) {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: { increment: 1 },
        },
      });

      const { password, ...userWithoutPassword } = user;
      const newUser = {
        ...userWithoutPassword,
        createdAt: Number(user.createdAt),
        updatedAt: Number(user.updatedAt),
      };
      return newUser;
    } else {
      throw new ForbiddenException('Incorrect old password.'); // Throw HttpException with 403 status
    }
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.prisma.user.delete({
        where: { id },
      });
      return deleteUser;
    } catch (error) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }
}
