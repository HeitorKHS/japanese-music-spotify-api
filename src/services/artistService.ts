import { SpotifyArtist, SpotifyTrack } from "../types/spotify";
import { getArtistById, getArtistTopTracks } from "../repositories/artistRepository";

interface ArtistData{
    artist: SpotifyArtist | null,
    topTracks: SpotifyTrack[],
};

export async function getArtistData(artistId: string): Promise<ArtistData>{

    try{

        const [ artist, topTracks ] = await Promise.all([
            getArtistById(artistId),
            getArtistTopTracks(artistId),
        ]);

        return{
            artist: artist,
            topTracks: topTracks,
        };

    } catch(error){
        
        console.error('Erro ao buscar dados do artista: ', error);

        return{
            artist: null,
            topTracks: [],
        };

    }

}