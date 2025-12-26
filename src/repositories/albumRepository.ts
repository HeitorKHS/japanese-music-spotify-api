import { spotifyFetch, buildQueryString } from "../lib/spotify/client";
import { SpotifyAlbum } from "../types/spotify";

//Search for details about a specific album by ID
export async function getAlbum(albumId: string): Promise<SpotifyAlbum>{

    return spotifyFetch<SpotifyAlbum>(
        `/albums/${albumId}`
    );

}