import { SpotifyArtist, SpotifyTrack, SpotifyImage } from "../types/spotify";
import { SPOTIFY_PLAYLISTS } from "../constants/spotify";
import { getPlaylist } from "../repositories/playlistRepository";
import { getSeveralArtists } from "../repositories/artistRepository";

interface HomeData{
    tokyoArtits: SpotifyArtist[],
    indieArtits: SpotifyArtist[],
    womenArtits: SpotifyArtist[],
    rapArtits: SpotifyArtist[],
    rockArtits: SpotifyArtist[],
};

interface ArtistsPlaylist{
    artistPlaylist: {
        name: string,
        images: SpotifyImage[],
        artists: SpotifyArtist[],
    },
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
            getPlaylist(SPOTIFY_PLAYLISTS.TOKYO_SUPER_HITS),
            getPlaylist(SPOTIFY_PLAYLISTS.INDIE_JAPAN),
            getPlaylist(SPOTIFY_PLAYLISTS.JAPANESE_WOMEN),
            getPlaylist(SPOTIFY_PLAYLISTS.ROCK_JAPAN),
            getPlaylist(SPOTIFY_PLAYLISTS.RAP_JAPAN),
        ]);

        const [ tokyoTracksArtists, indieTracksArtists, womenTracksArtists, rockTracksArtists, rapTracksArtists ] = await Promise.all([
            filterArtist(tokyoTracks.tracks.items.map(item => item.track), 11),
            filterArtist(indieTracks.tracks.items.map(item => item.track), 10), 
            filterArtist(womenTracks.tracks.items.map(item => item.track), 10), 
            filterArtist(rockTracks.tracks.items.map(item => item.track), 10),
            filterArtist(rapTracks.tracks.items.map(item => item.track), 10),
        ]);

        return{
            tokyoArtits: tokyoTracksArtists.slice(1, 11),
            indieArtits: indieTracksArtists.slice(0, 10),
            womenArtits: womenTracksArtists,
            rapArtits: rapTracksArtists,
            rockArtits: rockTracksArtists,
        };

    } catch(error){

        console.error('Erro ao buscar dados da home: ', error);

        return{
            tokyoArtits: [],
            indieArtits: [],
            womenArtits: [],
            rapArtits: [],
            rockArtits: [],
        };

    }

}

export async function getArtistsFromPlaylist(idPlaylist: string): Promise<ArtistsPlaylist>{

    try{

        const response = await getPlaylist(idPlaylist);

        const artists = await filterArtist(response.tracks.items.map(item => item.track), 50);

        return{
            artistPlaylist:{
                name: response.name,
                images: response.images,
                artists: artists,
            },
        };

    } catch(error){

        console.error('Erro ao buscar dados da home: ', error);

        return{
            artistPlaylist:{
                name: "",
                images: [],
                artists: [],
            },
        };

    }

}