import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { artistsDB } from 'src/dataBase/artists/artistsDB';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const id = v4();
    const Artist = {
      id,
      ...createArtistDto,
    };
    artistsDB.push(Artist);
    return Artist;
  }

  findAll() {
    return artistsDB;
  }

  findOne(id: string) {
    return artistsDB.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = artistsDB.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    } else {
      artistsDB[artistIndex] = {
        ...artistsDB[artistIndex],
        ...updateArtistDto,
      };

      return artistsDB[artistIndex];
    }
  }

  remove(id: string) {
    const indexToRemove = artistsDB.findIndex((obj) => obj.id === id);
    if (indexToRemove > -1) {
      artistsDB.splice(indexToRemove, 1);
      return true;
    } else {
      return false;
    }
  }
}
