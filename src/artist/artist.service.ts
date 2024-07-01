import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { artistsDB } from 'src/dataBase/artists/artistsDB';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  private async getArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      return false;
    }
    return artist;
  }
  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        id: v4(),
        ...createArtistDto,
      },
    });
    return artist;
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  findOne(id: string) {
    return this.getArtist(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getArtist(id);
    if (!artist) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    } else {
      const artistUpdate = await this.prisma.artist.update({
        where: {
          id,
        },
        data: updateArtistDto,
      });
      return artistUpdate;
    }
  }

  async remove(id: string) {
    const artist = await this.getArtist(id);
    if (artist) {
      await this.prisma.artist.delete({
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
