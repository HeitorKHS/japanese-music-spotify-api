import { getArtistById, getArtistTopTracks, getArtistFiveAlbums, getArtistFiveSinglesAndEps, getAllArtistAlbums, getRelatedArtists, getArtistFiveAppearsOn } from "@/repositories/artistRepository";
import { SpotifyArtist, SpotifyAlbum, SpotifyTrack } from "@/types/spotify";

export interface ArtistData {
    artist: SpotifyArtist | null,
    topTracks: SpotifyTrack[],
    fiveAlbums: SpotifyAlbum[],
    fiveSinglesAndEps: SpotifyAlbum[],
    fiveAppearsOn: SpotifyAlbum[],
    //relatedArtists: SpotifyArtist[],
}

export async function getArtistData(artistId: string): Promise<ArtistData> {

    try{
        
        const [artist, topTracks, fiveAlbums, fiveSinglesAndEps, fiveAppearsOn] = await Promise.all([
            getArtistById(artistId),
            getArtistTopTracks(artistId),
            getArtistFiveAlbums(artistId),
            getArtistFiveSinglesAndEps(artistId),
            getArtistFiveAppearsOn(artistId)
            //getRelatedArtists(artistId),
        ]);

        return{
            artist: artist,
            topTracks: topTracks,
            fiveAlbums: fiveAlbums,
            fiveSinglesAndEps: fiveSinglesAndEps,
            fiveAppearsOn: fiveAppearsOn,
           // relatedArtists: relatedArtists.artists,
        }

    } catch (error){
        console.error('Erro ao buscar dados do artista:', error);
        return{
            artist: null,
            topTracks: [],
            fiveAlbums: [],
            fiveSinglesAndEps: [],
            fiveAppearsOn: [],
            //relatedArtists: [],
        }
    }

}