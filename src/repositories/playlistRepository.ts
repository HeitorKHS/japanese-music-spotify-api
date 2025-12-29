import { spotifyFetch, buildQueryString } from "../lib/spotify/client";
import { SpotifyPlaylist } from "../types/spotify";

export async function getPlaylist(playlistId: string): Promise<SpotifyPlaylist>{

    const query = buildQueryString({
        limit: 50,
        offset: 0,
        fields: "id,name,type,uri,href,external_urls,images,tracks(items(track(id,name,artists,album,duration_ms,explicit,preview_url,popularity,external_urls)))",
    });

    const response = await spotifyFetch<SpotifyPlaylist>(
        `/playlists/${playlistId}?${query}`
    );

    return response;

}