import { spotifyFetch, buildQueryString } from "@/lib/spotify/client";
import { SpotifyTrack } from "@/types/spotify";
import { SPOTIFY_MARKET } from "@/constants/spotify";

//Search songs by id
export async function searchTracksById(trackId: number): Promise<SpotifyTrack>{

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
    });

    return await spotifyFetch<SpotifyTrack>(`/tracks/${trackId}${query}`);

}

