export type AlbumType = {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
};
