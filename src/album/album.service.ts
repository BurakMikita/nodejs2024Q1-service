import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 } from 'uuid';
import { albumsDB } from 'src/dataBase/albums/albumsDB';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const id = v4();
    const Album = {
      id,
      ...createAlbumDto,
    };
    albumsDB.push(Album);
    return Album;
  }

  findAll() {
    return albumsDB;
  }

  findOne(id: string) {
    return albumsDB.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = albumsDB.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    } else {
      albumsDB[albumIndex] = { ...albumsDB[albumIndex], ...updateAlbumDto };

      return albumsDB[albumIndex];
    }
  }

  remove(id: string) {
    const indexToRemove = albumsDB.findIndex((obj) => obj.id === id);
    if (indexToRemove > -1) {
      albumsDB.splice(indexToRemove, 1);
      return true;
    } else {
      return false;
    }
  }
}
