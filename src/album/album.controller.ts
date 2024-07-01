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
  HttpCode,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidParamValidator } from 'src/validatorCustom/UuidParamValidator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', UuidParamValidator) id: string) {
    const result = await this.albumService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return result;
  }

  @Put(':id')
  update(
    @Param('id', UuidParamValidator) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', UuidParamValidator) id: string) {
    const result = await this.albumService.remove(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }
}
