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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidParamValidator } from 'src/validatorCustom/UuidParamValidator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', UuidParamValidator) id: string) {
    const result = await this.trackService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return result;
  }

  @Put(':id')
  update(
    @Param('id', UuidParamValidator) id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', UuidParamValidator) id: string) {
    const result = await this.trackService.remove(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }
}
