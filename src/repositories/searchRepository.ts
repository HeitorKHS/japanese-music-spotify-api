import { buildQueryString, spotifyFetch } from "../lib/spotify/client";
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack, SpotifyPagination } from "../types/spotify";
import { SPOTIFY_MARKET } from "../constants/spotify";

interface SearchResponse{
    artists: SpotifyArtist[],
    albums: SpotifyAlbum[],
    tracks: SpotifyTrack[],
};

export class SearchRepository{

    static async getSearch(q: string): Promise<SearchResponse>{

        const query = buildQueryString({
            q: q,
            type: "album,artist,track",
            market: SPOTIFY_MARKET,
        });

        const response = await spotifyFetch<{
            artists: SpotifyPagination<SpotifyArtist>, 
            albums: SpotifyPagination<SpotifyAlbum>,
            tracks: SpotifyPagination<SpotifyTrack>
        }>(`/search${query}`);

        return{
            artists: response.artists.items,
            albums: response.albums.items,
            tracks: response.tracks.items,
        };

    }

}