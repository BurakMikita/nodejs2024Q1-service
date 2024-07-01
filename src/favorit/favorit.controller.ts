import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { FavoritService } from './favorit.service';
import { UuidParamValidator } from 'src/validatorCustom/UuidParamValidator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritController {
  constructor(private readonly favoritService: FavoritService) {}

  @Get()
  findAll() {
    return this.favoritService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', UuidParamValidator) id: string) {
    const resultId = await this.favoritService.addTrack(id);

    if (resultId) {
      return { message: `Track with ID ${id} save in favorits` };
    } else {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', UuidParamValidator) id: string) {
    const resultId = await this.favoritService.removeTrack(id);
    if (resultId) {
      return { message: `Track with ID ${id} deleted in favorits` };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id', UuidParamValidator) id: string) {
    const resultId = await this.favoritService.addAlbum(id);
    if (resultId) {
      return { message: `Album with ID ${id} save in favorits` };
    } else {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', UuidParamValidator) id: string) {
    const resultId = await this.favoritService.removeAlbum(id);
    if (resultId) {
      return { message: `Album with ID ${id} deleted in favorits` };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id', UuidParamValidator) id: string) {
    const resultId = await this.favoritService.addArtist(id);
    if (resultId) {
      return { message: `Artist with ID ${id} save in favorits` };
    } else {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', UuidParamValidator) id: string) {
    const resultId = await this.favoritService.removeArtist(id);
    if (resultId) {
      return { message: `Atist with ID ${id} deleted in favorits` };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
