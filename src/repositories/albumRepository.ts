import { spotifyFetch, buildQueryString } from "@/lib/spotify/client";
import { SpotifyAlbum, SpotifyPagination } from "@/types/spotify";
import { SPOTIFY_MARKET } from "@/constants/spotify";

//Search for details of a specific album
export async function getAlbumById(albumId: string): Promise<SpotifyAlbum> {

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
    });

    return await spotifyFetch<SpotifyAlbum>(`/albums/${albumId}${query}`);

}

//Related Albums
export async function getRelatedAlbums(artistId: string): Promise<SpotifyAlbum[]> {

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
        limit: 5,
    });

    const response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
        `/artists/${artistId}/albums${query}`
    );

    return response.items

}