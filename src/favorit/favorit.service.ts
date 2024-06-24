import { Injectable } from '@nestjs/common';
import { tacksDB } from 'src/dataBase/tracks/tracksDB';
import { favoritesDB } from 'src/dataBase/favorites/favoritesDB';
import { albumsDB } from 'src/dataBase/albums/albumsDB';
import { artistsDB } from 'src/dataBase/artists/artistsDB';

@Injectable()
export class FavoritService {
  findAll() {
    return favoritesDB;
  }

  addTrack(id: string) {
    const track = tacksDB.find((track) => track.id === id);
    if (track) {
      favoritesDB.tracks.push(track);
      return track.id;
    } else {
      return null;
    }
  }

  removeTrack(id: string) {
    const trackIndex = favoritesDB.tracks.findIndex((track) => track.id === id);
    if (trackIndex > -1) {
      favoritesDB.tracks.splice(trackIndex, 1);
      return id;
    }
    return null;
  }

  addArtist(id: string) {
    const artist = artistsDB.find((artist) => artist.id === id);
    if (artist) {
      favoritesDB.artists.push(artist);
      return artist.id;
    } else {
      return null;
    }
  }

  removeArtist(id: string) {
    const artistIndex = favoritesDB.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex > -1) {
      favoritesDB.artists.splice(artistIndex, 1);
      return id;
    }
    return null;
  }
  addAlbum(id: string) {
    const album = albumsDB.find((album) => album.id === id);
    if (album) {
      favoritesDB.albums.push(album);
      return album.id;
    } else {
      return null;
    }
  }

  removeAlbum(id: string) {
    const albumIndex = favoritesDB.albums.findIndex((album) => album.id === id);
    if (albumIndex > -1) {
      favoritesDB.albums.splice(albumIndex, 1);
      return id;
    }
    return null;
  }
}
