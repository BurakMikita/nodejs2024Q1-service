import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
  ParseUUIDPipe,
  HttpCode,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUUID } from 'class-validator';
import { UuidParamValidator } from 'src/validatorCustom/UuidParamValidator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', UuidParamValidator) id: string) {
    const result = this.userService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return result;
  }

  @Put(':id')
  update(
    @Param('id', UuidParamValidator) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UuidParamValidator) id: string) {
    const result = this.userService.remove(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }
}
