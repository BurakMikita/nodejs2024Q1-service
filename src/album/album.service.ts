import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 } from 'uuid';
import { albumsDB } from 'src/dataBase/albums/albumsDB';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  private async getAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      return false;
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const Album = await this.prisma.album.create({
      data: {
        id: v4(),
        ...createAlbumDto,
      },
    });
    return Album;
  }

  findAll() {
    return this.prisma.album.findMany();
  }

  findOne(id: string) {
    return this.getAlbum(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getAlbum(id);
    if (!album) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    } else {
      const albumUpdate = await this.prisma.album.update({
        where: {
          id,
        },
        data: updateAlbumDto,
      });
      return albumUpdate;
    }
  }

  async remove(id: string) {
    const album = await this.getAlbum(id);
    if (album) {
      await this.prisma.album.delete({
        where: {
          id,
        },
      });
      return true;
    } else {
      return false;
    }
  }
}
