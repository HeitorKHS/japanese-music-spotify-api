import { SpotifyArtist, SpotifyTrack } from "../types/spotify";
import { SPOTIFY_PLAYLISTS } from "../constants/spotify";
import { getPlaylistTracks } from "../repositories/playlistRepository";
import { getSeveralArtists } from "../repositories/artistRepository";

interface HomeData{
    featuredArtist: SpotifyArtist | null,
    tokyoArtits: SpotifyArtist[],
    indieArtits: SpotifyArtist[],
    womenArtits: SpotifyArtist[],
    rapArtits: SpotifyArtist[],
    rockArtits: SpotifyArtist[],
};

async function filterArtist(tracks: SpotifyTrack[], limit: number): Promise<SpotifyArtist[]>{

    const uniqueArtistIds = new Set<string>();

    for(const track of tracks){

        if(uniqueArtistIds.size >= limit) break;

        const mainArtist = track.artists[0];//If there is more than one artist, he will pick the first one, who should be the main one.

        if(mainArtist && !uniqueArtistIds.has(mainArtist.id)){
            uniqueArtistIds.add(mainArtist.id);
        }
        
    }

    const artistIds = Array.from(uniqueArtistIds); 

    const artists = await getSeveralArtists(artistIds);

    return artists;

}


export async function getHomeData(): Promise<HomeData>{

    try{

        const [ tokyoTracks, indieTracks, womenTracks, rockTracks, rapTracks ] = await Promise.all([
            getPlaylistTracks(SPOTIFY_PLAYLISTS.TOKYO_SUPER_HITS),
            getPlaylistTracks(SPOTIFY_PLAYLISTS.INDIE_JAPAN),
            getPlaylistTracks(SPOTIFY_PLAYLISTS.JAPANESE_WOMEN),
            getPlaylistTracks(SPOTIFY_PLAYLISTS.ROCK_JAPAN),
            getPlaylistTracks(SPOTIFY_PLAYLISTS.RAP_JAPAN),
        ]);

        const tokyoTracksArtists = await filterArtist(tokyoTracks, 11);
        const indieTracksArtists = await filterArtist(indieTracks, 10); 
        const womenTracksArtists = await filterArtist(womenTracks, 10); 
        const rockTracksArtists = await filterArtist(rockTracks, 10); 
        const rapTracksArtists = await filterArtist(rapTracks, 10); 

        return{
            featuredArtist: tokyoTracksArtists[0] || null,
            tokyoArtits: tokyoTracksArtists.slice(1, 11),
            indieArtits: indieTracksArtists.slice(0, 10),
            womenArtits: womenTracksArtists.slice(0, 10),
            rapArtits: rapTracksArtists.slice(0, 10),
            rockArtits: rockTracksArtists.slice(0, 10),
        };

    } catch(error){

        console.error('Erro ao buscar dados da home: ', error);

        return{
            featuredArtist: null,
            tokyoArtits: [],
            indieArtits: [],
            womenArtits: [],
            rapArtits: [],
            rockArtits: [],
        };

    }

}