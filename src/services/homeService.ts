import { getTokyoSuperHits, getWomenVoice, getRockJapan } from "@/repositories/playlistRepository";
import { getArtistById } from "@/repositories/artistRepository";
import { SpotifyArtist, SpotifyTrack } from "@/types/spotify";

export interface HomeData{
    featuredArtistOfDay: SpotifyArtist | null;
    featuredArtistsOfWeek: SpotifyArtist[];
    featuredTracksOfWeek: SpotifyTrack[];
    featuredWomenTracks: SpotifyTrack[];
    featuredRockTracks: SpotifyTrack[];
    allTokyoTracks: SpotifyTrack[];  
    allWomenTracks: SpotifyTrack[];
    allRockTracks: SpotifyTrack[]; 
}

async function extractUniqueArtists(tracks: SpotifyTrack[], limit: number): Promise<SpotifyArtist[]> {

    const uniqueArtistIds = new Set<string>();

    for(const track of tracks){

        if(uniqueArtistIds.size >= limit) break;

        const mainArtist = track.artists[0];//If there is more than one artist, he will pick the first one, who should be the main one.

        if(mainArtist && !uniqueArtistIds.has(mainArtist.id)){
            uniqueArtistIds.add(mainArtist.id);
        }

    }

    const artistIds = Array.from(uniqueArtistIds); 

    const artistsPromises = artistIds.map(id => getArtistById(id));
    const artists = await Promise.all(artistsPromises);

    return artists;

}

export async function getHomeData(): Promise<HomeData>{

    try{

        const [tokyoTracks, womenTracks, rockTracks] = await Promise.all([getTokyoSuperHits(), getWomenVoice(), getRockJapan()]);
       
        const uniqueArtists = await extractUniqueArtists(tokyoTracks, 11);

        return{
            featuredArtistOfDay: uniqueArtists[0] || null,
            featuredArtistsOfWeek: uniqueArtists.slice(1, 11),
            featuredTracksOfWeek: tokyoTracks.slice(0, 10),
            featuredWomenTracks: womenTracks.slice(0, 10),
            featuredRockTracks: rockTracks.slice(0, 10),
            allTokyoTracks: tokyoTracks,  
            allWomenTracks: womenTracks,
            allRockTracks: rockTracks,
        }

    } catch (error){
        console.error('Erro ao buscar dados da home: ', error);
        return{
            featuredArtistOfDay: null,
            featuredArtistsOfWeek: [],
            featuredTracksOfWeek: [],
            featuredWomenTracks: [],
            featuredRockTracks: [],
            allTokyoTracks: [],  
            allWomenTracks: [],
            allRockTracks: [],
        }
    }

}
