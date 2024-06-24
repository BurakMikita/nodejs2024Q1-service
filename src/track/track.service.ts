import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tacksDB } from 'src/dataBase/tracks/tracksDB';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const id = v4();
    const Track = {
      id,
      ...createTrackDto,
    };
    tacksDB.push(Track);
    return Track;
  }

  findAll() {
    return tacksDB;
  }

  findOne(id: string) {
    return tacksDB.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = tacksDB.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    } else {
      tacksDB[trackIndex] = { ...tacksDB[trackIndex], ...updateTrackDto };

      return tacksDB[trackIndex];
    }
  }

  remove(id: string) {
    const indexToRemove = tacksDB.findIndex((obj) => obj.id === id);
    if (indexToRemove > -1) {
      tacksDB.splice(indexToRemove, 1);
      return true;
    } else {
      return false;
    }
  }
}
