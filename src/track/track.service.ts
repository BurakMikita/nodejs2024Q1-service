import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  private async getTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      return false;
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        id: v4(),
        ...createTrackDto,
      },
    });
    return track;
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  findOne(id: string) {
    return this.getTrack(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.getTrack(id);

    if (!track) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    } else {
      const trackUpdate = await this.prisma.track.update({
        where: {
          id,
        },
        data: updateTrackDto,
      });
      return trackUpdate;
    }
  }

  async remove(id: string) {
    const track = await this.getTrack(id);
    if (track) {
      await this.prisma.track.delete({
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
