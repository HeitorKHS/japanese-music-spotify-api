import { spotifyFetch, buildQueryString } from "@/lib/spotify/client";
import { SpotifyArtist, SpotifyAlbum, SpotifyTrack, SpotifyPagination } from "@/types/spotify";
import { SPOTIFY_MARKET } from "@/constants/spotify";

export interface SearchAllProps{
    artists: SpotifyArtist[],
    albums: SpotifyAlbum[], 
    tracks: SpotifyTrack[],
};

export async function searchAll(search: string): Promise<SearchAllProps>{

    const query = buildQueryString({
        q: search,
        type: 'artist,album,track',
        market: SPOTIFY_MARKET,
    });

    const response = await spotifyFetch<{
        artists: SpotifyPagination<SpotifyArtist>; 
        albums: SpotifyPagination<SpotifyAlbum>; 
        tracks: SpotifyPagination<SpotifyTrack>}>
    (`/search${query}`);


    return {
        artists: response.artists.items,
        albums: response.albums.items,
        tracks: response.tracks.items,
    }

}