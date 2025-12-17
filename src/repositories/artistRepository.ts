import { spotifyFetch, buildQueryString } from "../lib/spotify/client";
import { SpotifyArtist } from "../types/spotify";

export async function getSeveralArtists(ids: string[]): Promise<SpotifyArtist[]>{

    const idsQuery = ids.join(",");
    
    const response = await spotifyFetch<{ artists: SpotifyArtist[] }>(
        `/artists?ids=${idsQuery}`
    );

    return response.artists;

}