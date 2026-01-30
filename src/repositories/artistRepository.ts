import { buildQueryString, spotifyFetch } from "../lib/spotify/client";
import { SpotifyArtist, SpotifyTrack, SpotifyAlbum, SpotifyPagination } from "../types/spotify";
import { SPOTIFY_MARKET } from "../constants/spotify";

export class ArtistRepository{

    //Search for details about various artists
    static async getSeveralArtists(artistsId: string[]): Promise<SpotifyArtist[]>{

        const idsQuery = artistsId.join(",");

        const response = await spotifyFetch<{artists: SpotifyArtist[]}>(
            `/artists?ids=${idsQuery}`
        );

        return response.artists;

    }

    //Search for details about a specific artist by ID
    static async getArtist(artistId: string): Promise<SpotifyArtist>{

        return await spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);

    }

    //Get artist top tracks
    static async getTopTracks(artistId: string): Promise<SpotifyTrack[]>{

        const query = buildQueryString({
            market: SPOTIFY_MARKET,
        });

        const response = await spotifyFetch<{tracks: SpotifyTrack[]}>( `/artists/${artistId}/top-tracks${query}`)

        return response.tracks;

    }

    //Get artist albums
    static async getAlbums(artistId: string, offset = 0, limit = 50, groups: string): Promise<SpotifyPagination<SpotifyAlbum>>{

        const query = buildQueryString({
            market: SPOTIFY_MARKET,
            limit: limit,
            offset: offset,
            include_groups: groups,
        });

        return await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(`/artists/${artistId}/albums${query}`);

    }

}