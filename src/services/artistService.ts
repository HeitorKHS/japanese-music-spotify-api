import { SpotifyAlbum, SpotifyArtist, SpotifyTrack, SpotifyPagination } from "../types/spotify";
import { getArtistById, getArtistTopTracks, getArtistAlbums } from "../repositories/artistRepository";

interface ArtistData{
    artist: SpotifyArtist | null,
    topTracks: SpotifyTrack[],
    albumsPreview: SpotifyAlbum[],
    singlesEpsPreview: SpotifyAlbum[],
    appearsOnPreview: SpotifyAlbum[],
};

export async function getArtistData(artistId: string): Promise<ArtistData>{

    try{

        const [ artist, topTracks, albumsPreview, singlesEpsPreview, appearsOnPreview ] = await Promise.all([
            getArtistById(artistId),
            getArtistTopTracks(artistId),
            getArtistAlbums(artistId, 0, 50, "album"),
            getArtistAlbums(artistId, 0, 50, "single"),
            getArtistAlbums(artistId, 0, 50, "appears_on"),
        ]);

        return{
            artist: artist,
            topTracks: topTracks,
            albumsPreview: albumsPreview.items.slice(0, 8), 
            singlesEpsPreview: singlesEpsPreview.items.slice(0, 8), 
            appearsOnPreview: appearsOnPreview.items.slice(0, 8),
        };

    } catch(error){
        
        console.error('Erro ao buscar dados do artista: ', error);

        return{
            artist: null,
            topTracks: [],
            albumsPreview: [],
            singlesEpsPreview: [],
            appearsOnPreview: [],
        };

    }

}