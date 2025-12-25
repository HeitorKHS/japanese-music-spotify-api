import { spotifyFetch, buildQueryString } from "../lib/spotify/client";
import { SpotifyAlbum, SpotifyArtist, SpotifyPagination, SpotifyTrack } from "../types/spotify";
import { SPOTIFY_MARKET } from "../constants/spotify";

//Search for details about various artists
export async function getSeveralArtists(artistId: string[]): Promise<SpotifyArtist[]>{

    const idsQuery = artistId.join(",");
    
    const response = await spotifyFetch<{ artists: SpotifyArtist[] }>(
        `/artists?ids=${idsQuery}`
    );

    return response.artists;

}

//Search for details about a specific artist by ID
export async function getArtistById(artistId: string): Promise<SpotifyArtist>{

    return await spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);

}

//Get artist top tracks
export async function getArtistTopTracks(artistId: string): Promise<SpotifyTrack[]>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
    });

    const response = await spotifyFetch<{tracks: SpotifyTrack[]}>(
        `/artists/${artistId}/top-tracks${query}`
    );

    return response.tracks;

}

//Get artist albums
export async function getArtistAlbums(artistId: string, offset = 0, limit = 50, groups: string): Promise<SpotifyPagination<SpotifyAlbum>>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
        limit: limit,
        offset: offset,
        include_groups: groups,
    });

    return await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
        `/artists/${artistId}/albums${query}`
    );

}