import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritService {
  constructor(private readonly prisma: PrismaService) {}

  private async getOrCreateFavorites() {
    let favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {},
      });
    }
    return favorites;
  }

  async findAll() {
    const fav = await this.prisma.favorites.findFirst({
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            year: true,
            name: true,
            artistId: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    if (!fav) {
      return { artists: [], albums: [], tracks: [] };
    }
    return fav;
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(`track with id ${id} not found`);
    }
    const favorites = await this.getOrCreateFavorites();
    return this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        tracks: {
          connect: { id },
        },
      },
    });
  }

  async removeTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(`track with id ${id} not found`);
    }
    const favorites = await this.getOrCreateFavorites();
    return this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        tracks: {
          disconnect: { id },
        },
      },
    });
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(`artist with id ${id} not found`);
    }
    const favorites = await this.getOrCreateFavorites();
    return this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        artists: {
          connect: { id },
        },
      },
    });
  }

  async removeArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(`artist with id ${id} not found`);
    }
    const favorites = await this.getOrCreateFavorites();
    return this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        artists: {
          disconnect: { id },
        },
      },
    });
  }
  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }

    const favorites = await this.getOrCreateFavorites();
    return this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        albums: {
          connect: { id },
        },
      },
    });
  }

  async removeAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }
    const favorites = await this.getOrCreateFavorites();
    return this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        albums: {
          disconnect: { id },
        },
      },
    });
  }
}
