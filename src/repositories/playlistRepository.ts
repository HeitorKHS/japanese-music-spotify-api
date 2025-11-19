import { spotifyFetch, buildQueryString } from "@/lib/spotify/client";
import { TOKYO_SUPER_HITS_ID, JAPANESE_WOMEN_ID, ROCK_JAPAN_ID } from "@/constants/spotify";
import { SpotifyTrack } from "@/types/spotify";

interface PlaylistTrack{
    track: SpotifyTrack;
}

interface PlaylistResponse{
    items: PlaylistTrack[];
}

//Search all musics off playlist
export async function getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]>{

    const query = buildQueryString({
        limit: 100,
        offset: 0,
        fields: 'items(track(id,name,artists,album,duration_ms,explicit,preview_url,popularity,external_urls))'
    });

    const response = await spotifyFetch<PlaylistResponse>(
        `/playlists/${playlistId}/tracks${query}`
    );

    return response.items.map(item => item.track);

}

//Tokyo super hits
export async function getTokyoSuperHits(): Promise<SpotifyTrack[]>{
    return await getPlaylistTracks(TOKYO_SUPER_HITS_ID);
}

//Women Voice
export async function getWomenVoice(): Promise<SpotifyTrack[]>{
    return await getPlaylistTracks(JAPANESE_WOMEN_ID);
}

//Rock japan
export async function getRockJapan(): Promise<SpotifyTrack[]>{
    return await getPlaylistTracks(ROCK_JAPAN_ID);
}