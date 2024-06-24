import { AlbumType } from 'src/album/type/AlbumType';
import { ArtistType } from 'src/artist/type/ArtistType';
import { TrackType } from 'src/track/type/TrackType';

export type FavoritType = {
  tracks: TrackType[];
  artists: ArtistType[];
  albums: AlbumType[];
};
