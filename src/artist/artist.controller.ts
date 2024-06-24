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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidParamValidator } from 'src/validatorCustom/UuidParamValidator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UuidParamValidator) id: string) {
    const result = this.artistService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return result;
  }

  @Put(':id')
  update(
    @Param('id', UuidParamValidator) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const result = this.artistService.remove(id);
    if (!result) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }
}
