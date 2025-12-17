import { spotifyFetch, buildQueryString } from "../lib/spotify/client";
import { SPOTIFY_PLAYLISTS } from "../constants/spotify";
import { SpotifyArtist, SpotifyTrack } from "../types/spotify";

interface PlaylistTrack{
    track: SpotifyTrack,
};


interface PlaylistResponse{
    items: PlaylistTrack[],
};

interface MultipleArtistsResponse{
    artists: SpotifyArtist,
};

export async function getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]>{

    const query = buildQueryString({
        limit: 50,
        offset: 0,
        fields: "items(track(artists))"
    });

    const response = await spotifyFetch<PlaylistResponse>(
        `/playlists/${playlistId}/tracks${query}`
    );

    return response.items.map(item => item.track);

}