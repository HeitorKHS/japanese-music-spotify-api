import { buildQueryString, spotifyFetch } from "../lib/spotify/client";
import { SpotifyAlbum } from "../types/spotify";

export class AlbumRepository{

    static async getAlbum(albumId: string): Promise<SpotifyAlbum>{

        return await spotifyFetch<SpotifyAlbum>(`/albums/${albumId}`);

    }

}