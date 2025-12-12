import { spotifyFetch, buildQueryString } from "@/lib/spotify/client";
import { SpotifyAlbum, SpotifyArtist, SpotifyPagination, SpotifyTrack } from "@/types/spotify";
import { SPOTIFY_MARKET } from "@/constants/spotify";

//Search artists by genre
export async function searchArtistByGenre(genre: string, limit: number = 20, offset: number = 0): Promise<SpotifyPagination<SpotifyArtist>> {

    const query = buildQueryString({
        q: `genre:"${genre}"`,
        type: 'artist',
        market: SPOTIFY_MARKET,
        limit,
        offset,
    });

    const response = await spotifyFetch<{ artists: SpotifyPagination<SpotifyArtist>}>(
        `/search${query}`
    );

    return response.artists;

}

//Search for details about a specific artist
export async function getArtistById(artistId: string): Promise<SpotifyArtist>{
    return await spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);
}

//Find the 5 albums by an artist
export async function getArtistFiveAlbums(artistId: string): Promise<SpotifyAlbum[]>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
        include_groups: "album",
        limit: 5,
    });

    const response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
        `/artists/${artistId}/albums${query}`
    );

    return response.items

}

//Find the 5 singles and eps by an artist
export async function getArtistFiveSinglesAndEps(artistId: string): Promise<SpotifyAlbum[]>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
        include_groups: "single",
        limit: 5,
    });

    const response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
        `/artists/${artistId}/albums${query}`
    );

    return response.items

}

//Find the 5 albums, singles, and EPs that this artist appears on
export async function getArtistFiveAppearsOn(artistId: string): Promise<SpotifyAlbum[]>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
        include_groups: "appears_on",
        limit: 5,
    });

    const response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
        `/artists/${artistId}/albums${query}`
    );

    return response.items

}

//Get all the artist's albums
export async function getAllArtistAlbums(artistId: string) : Promise<SpotifyAlbum[]>{
    
    let allAlbums: SpotifyAlbum[] = [];
    let offset = 0;
    const limit = 50;
    let hasMore = true;

    while(hasMore){

        const query = buildQueryString({
            market: SPOTIFY_MARKET,
            limit,
            offset,
        });

        const response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
            `/artists/${artistId}/albums${query}`
        );

        allAlbums.push(...response.items);

        hasMore = response.next !== null;
        offset += limit;

    }

    return allAlbums.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

}

//Get all the artist's albums
export async function getAllArtistAlbumsAppearsOn(artistId: string) : Promise<SpotifyAlbum[]>{
    
    let allAlbums: SpotifyAlbum[] = [];
    let offset = 0;
    const limit = 50;
    let hasMore = true;

    while(hasMore){

        const query = buildQueryString({
            market: SPOTIFY_MARKET,
            include_groups: "appears_on",
            limit,
            offset,
        });

        const response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
            `/artists/${artistId}/albums${query}`
        );

        allAlbums.push(...response.items);

        hasMore = response.next !== null;
        offset += limit;

    }

    return allAlbums.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

}

//Search for the artist's top tracks
export async function getArtistTopTracks(artistId: string): Promise<SpotifyTrack[]>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
    });

    const response = await spotifyFetch<{tracks: SpotifyTrack[]}>(
        `/artists/${artistId}/top-tracks${query}`
    );

    return response.tracks;

}

//Search related artists
export async function getRelatedArtists(artistId: string): Promise<{ artists: SpotifyArtist[] }>{

  return await spotifyFetch<{ artists: SpotifyArtist[]}>(
    `/artists/${artistId}/related-artists`
  );

}