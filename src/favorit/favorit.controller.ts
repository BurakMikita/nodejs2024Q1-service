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
import { CreateFavoritDto } from './dto/create-favorit.dto';
import { UpdateFavoritDto } from './dto/update-favorit.dto';
import { UuidParamValidator } from 'src/validatorCustom/UuidParamValidator';

@Controller('favorit')
export class FavoritController {
  constructor(private readonly favoritService: FavoritService) {}

  @Get()
  findAll() {
    return this.favoritService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', UuidParamValidator) id: string) {
    const resultId = this.favoritService.addTrack(id);
    if (resultId) {
      return { message: `Track with ID ${resultId} save in favorits` };
    } else {
      throw new HttpException(
        `Track with ID ${resultId} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', UuidParamValidator) id: string) {
    const resultId = this.favoritService.removeTrack(id);
    if (resultId) {
      return { message: `Track with ID ${resultId} deleted in favorits` };
    } else {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', UuidParamValidator) id: string) {
    const resultId = this.favoritService.addAlbum(id);
    if (resultId) {
      return { message: `Album with ID ${resultId} save in favorits` };
    } else {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', UuidParamValidator) id: string) {
    const resultId = this.favoritService.removeAlbum(id);
    if (resultId) {
      return { message: `Album with ID ${resultId} deleted in favorits` };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  addArtist(@Param('id', UuidParamValidator) id: string) {
    const resultId = this.favoritService.addArtist(id);
    if (resultId) {
      return { message: `Artist with ID ${resultId} save in favorits` };
    } else {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', UuidParamValidator) id: string) {
    const resultId = this.favoritService.removeArtist(id);
    if (resultId) {
      return { message: `Atist with ID ${resultId} deleted in favorits` };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
